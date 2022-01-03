import RNFetchBlob, {
  FetchBlobResponse,
  ReactNativeBlobUtilStat, // RNFetchBlobStat,
  StatefulPromise,
} from 'react-native-blob-util';
import { randomId } from './RandomId';
import { isIos } from './Platform';
import { EventRegister } from './EventRegister';
import { getFileName } from './Other';
import { logDebug, logError } from './Logger';
import {generateAttachmentUrl, jsonParse} from './StringUtils';
import type {IFileModel} from "../models/File";
import type {INullableId, INullableNumber, INullableString} from "../Interface/IBase";
import type {IServerAttachment} from "../models/IServerAttachment";

export type IRestMethods = 'GET' | 'POST' | 'PUT';

export interface IApiMeta {
  url: string;
  method?: IRestMethods;
  headers?: { [key: string]: string };
}

export interface IFileMetaToDownload {
  pathToDownload?: INullableString;
  fileName: INullableString;
  mimeType: INullableString;
  fileSize: INullableNumber;
  taskId?: string;
}
export interface IFetchBlobHandler {
  DefaultPathForDownload: string;
  Queue: Map<string, StatefulPromise<any>>;
  FileServiceProgress: { [key: string]: number };
  createDirectory(): Promise<void>;
  createDirectory(path?: string): Promise<void>;
  isFileExists(path: string): Promise<boolean>;
  downloadManager(
      apiMeta: IApiMeta,
      fileMeta: IFileMetaToDownload,
      downloadProgressCB?: (percent: number) => void,
      getTaskIdCB?: (id: string) => void,
      accessToken?: string,
  ): Promise<FetchBlobResponse>;
  uploadManager(
      apiMeta: IApiMeta,
      file: Partial<IFileModel>,
      uploadProgressCB?: ((percent: number) => void) | null,
      getTaskIdCB?: (id: string) => void,
      accessToken?: string,
  ): Promise<IFetchBlobUploadResult>;
  deleteFile(path: string): Promise<boolean>;
}

export interface IFetchBlobUploadResult extends IServerAttachment {
  taskId?: INullableId;
  path?: INullableString;
  url?: INullableString;
}

export enum BackgroundDownloadServiceEvents {
  'DOWNLOAD_BEGIN' = '0',
  'DOWNLOAD_PROGRESS' = '1',
  'DOWNLOAD_DONE' = '2',
  'DOWNLOAD_FAIL' = '3',
}

export type IBackgroundDownloadEventPayload = {
  progress: number;
  taskId: string;
  subEvent?: BackgroundDownloadServiceEvents;
};

export class FetchBlobHandler implements IFetchBlobHandler {
  static BACKGROUND_DOWNLOAD_EVENT: string = 'BACKGROUND_DOWNLOAD_EVENT';
  // readonly DefaultPathForDownload =
  // RNFetchBlob.fs.dirs.DCIMDir + '/airour/touraround/';
  readonly DefaultPathForDownload =
      (isIos ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.SDCardDir) +
      '/airtour/crew/';
  readonly ChatPath = this.DefaultPathForDownload + 'chat/';
  readonly EDMSDownloadPath = this.DefaultPathForDownload + 'edms/';

  static Queue: Map<string, StatefulPromise<any>> = new Map();

  static FileServiceProgress: { [key: string]: number } = {};
  constructor() {
    [this.DefaultPathForDownload, this.ChatPath, this.EDMSDownloadPath].forEach(
        async folder => {
          await this.createDirectory(folder);
        },
    );
  }
  getChatPath(): string {
    return this.ChatPath;
  }
  getEDMSDownloadPath(): string {
    return this.EDMSDownloadPath;
  }
  async createDirectory(path?: string): Promise<void> {
    try {
      await RNFetchBlob.fs.mkdir(path || this.DefaultPathForDownload);
    } catch (e) {
      logError(e?.toString(), 'createDirectory:' + path);
    }
  }
  async downloadManager(
      apiMeta: IApiMeta,
      fileMeta: IFileMetaToDownload | null,
      downloadProgressCB?: (percent: number) => void,
      getTaskIdCB?: (id: string) => void,
      accessToken?: string,
  ): Promise<FetchBlobResponse> {
    const taskId = fileMeta?.taskId ?? String(randomId(true));
    FetchBlobHandler.FileServiceProgress[taskId] = 0;
    if (getTaskIdCB) {
      getTaskIdCB(taskId);
    }
    try {
      const fileName =
          fileMeta?.fileName && fileMeta.mimeType
              ? fileMeta.fileName + '.' + fileMeta.mimeType
              : getFileName(apiMeta?.url);
      const downloadPath = (fileMeta?.pathToDownload || this.ChatPath);
      // const downloadPath = (fileMeta?.pathToDownload || this.ChatPath) + fileName;
      const task: StatefulPromise<any> = RNFetchBlob.config({
        path: downloadPath,
      }).fetch(apiMeta?.method || 'GET', apiMeta.url, {
        Authorization: 'Bearer ' + accessToken,
        ...(apiMeta?.headers ?? {}),
      });
      FetchBlobHandler.Queue.set(taskId, task);
      const response: FetchBlobResponse = await task
          .progress({ count: 10 }, () => {
            // .progress({count: 10}, (received, total) => {
            // not working
            // const progress = Math.ceil(
            //   Number((received / total).toFixed(2)) * 100,
            // );
            const progress = FetchBlobHandler.FileServiceProgress[taskId] + 7;
            FetchBlobHandler.FileServiceProgress[taskId] = progress;
            EventRegister.emit('download_progress', { progress, taskId });
            // ms download progress
            // if (__DEV__) {
            //   console.log('download_progress', progress);
            // }
            logDebug(progress, 'download progress for:' + taskId);
            if (downloadProgressCB) {
              downloadProgressCB(progress);
            }
          })
          .then(res => {
            EventRegister.emit('download_progress', { progress: 100, taskId });
            return res;
          });
      return response;
    } catch (e) {
      logError(e, 'eee:5');
      return Promise.reject(e);
    } finally {
      //garbage collect
      setTimeout(() => {
        delete FetchBlobHandler.FileServiceProgress?.[taskId];
      }, 4000);
      FetchBlobHandler.Queue.delete(taskId);
    }
  }

  async uploadManager(
      apiMeta: IApiMeta,
      file: Partial<IFileModel>,
      uploadProgressCB?: ((percent: number) => void) | null,
      getTaskIdCB?: (id: string) => void,
      accessToken?: string,
      mediaBaseUrl?: string,
  ): Promise<IFetchBlobUploadResult> {
    const taskId = String(randomId());
    FetchBlobHandler.FileServiceProgress[taskId] = 0;
    if (getTaskIdCB) {
      getTaskIdCB(taskId);
    }
    try {
      if (!file?.path?.length) {
        return Promise.reject('no file path for send');
      }
      const fromData = [
        {
          name: 'file',
          filename:
              (file?.name?.length ? file?.name : randomId(true)) +
              '.' +
              file?.extension ?? 'png',
          // filename: `${randomId(true) + '.' + file?.extension ?? 'png'}`,
          type: file?.type || 'image/png',
          data: RNFetchBlob.wrap(file?.path),
        },
      ];
      logDebug(fromData, 'fromData upload');
      const task: StatefulPromise<any> = RNFetchBlob.fetch(
          apiMeta?.method || 'POST',
          apiMeta.url,
          {
            Authorization: 'Bearer ' + accessToken,
            // 'Content-Type': 'application/octet-stream',
            'Content-Type': 'multipart/form-data',
            // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
            // Or simply wrap the file path with RNFetchBlob.wrap().
            ...(apiMeta?.headers ?? {}),
          },
          fromData,
      );
      FetchBlobHandler.Queue.set(taskId, task);
      const response: FetchBlobResponse = await task
          .uploadProgress(
              { interval: 2500 },
              (written: number, total: number) => {
                const progress = Math.ceil(
                    Number((written / total).toFixed(2)) * 100,
                );
                FetchBlobHandler.FileServiceProgress[taskId] = progress;
                EventRegister.emit('upload_progress', { progress, taskId });
                // ms upload progress
                if (uploadProgressCB) {
                  uploadProgressCB(written / total);
                }
              },
          )
          .then(res => {
            EventRegister.emit('upload_progress', { progress: 100, taskId });
            return res;
          });
      logError(response, 'responseUpload');
      const responseData: IServerAttachment =
          typeof response?.data === 'string'
              ? jsonParse(response?.data)
              : response.data;
      const {
        name = '',
        hash = null,
        id = null,
        mimeType = 'jpeg',
        size = 0,
      } = responseData ?? {};
      if (!id) {
        return Promise.reject('upload failed');
      }
      const url = generateAttachmentUrl(responseData, apiMeta.url ?? '');
      const responseUploadResultData: IFetchBlobUploadResult = {
        messageSequentialId: null,
        senderUserId: null,
        sentDate: null,
        name,
        hash,
        id,
        mimeType,
        size,
        taskId,
        thumbnailUrl: url,
        url: url,
        path: file.path,
      };
      return responseUploadResultData;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      //garbage collect
      setTimeout(() => {
        delete FetchBlobHandler.FileServiceProgress?.[taskId];
      }, 4000);
      //delete this.FileServiceProgress?.[taskId];
      FetchBlobHandler.Queue.delete(taskId);
    }
  }
  async cancelTask(taskId: string): Promise<boolean> {
    try {
      if (FetchBlobHandler.Queue.has(taskId)) {
        delete FetchBlobHandler.FileServiceProgress?.[taskId];
        await FetchBlobHandler.Queue.get(taskId)?.cancel();
        return true;
      } else {
        return Promise.reject('no task with id: ' + taskId);
      }
    } catch (e) {
      // if (__DEV__) {
      //   console.log('log:::cancelTask', e);
      // }
      return false;
    }
  }
  static getFileServiceProgress(taskId: string): number {
    return FetchBlobHandler.FileServiceProgress?.[taskId] || 100;
  }
  getFileServiceProgress(taskId: string): number {
    return FetchBlobHandler.getFileServiceProgress(taskId);
  }
  async getFileStat(path: string): Promise<ReactNativeBlobUtilStat> {
    try {
      return await RNFetchBlob.fs.stat(path);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async isFileExists(path: string): Promise<boolean> {
    try {
      return await RNFetchBlob.fs.exists(path);
    } catch (e) {
      return false;
    }
  }
  async copyFile(origin: string, destination: string): Promise<boolean> {
    // logError(origin,'copyFile origin')
    // logError(destination,'copyFile destination')
    try {
      await RNFetchBlob.fs.cp(origin, destination);
      return true;
    } catch (e) {
      return false;
    }
  }
  async deleteFile(path: string): Promise<boolean> {
    try {
      await RNFetchBlob.fs.unlink(path);
      return true;
    } catch (e) {
      return false;
    }
  }
}
export const FetchBlobClient = new FetchBlobHandler();
