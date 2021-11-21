import RNFetchBlob, {
  FetchBlobResponse,
  RNFetchBlobStat,
  StatefulPromise,
} from 'rn-fetch-blob';
import { isIos } from './Platform';
import { IFileModel } from '../models/File';
import {
  INullableId,
  INullableNumber,
  INullableString,
} from '../Interface/IBase';
import { logError } from './Logger';

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
  ): Promise<FetchBlobResponse>;
  uploadManager(
    apiMeta: IApiMeta,
    file: Partial<IFileModel>,
    uploadProgressCB?: ((percent: number) => void) | null,
    getTaskIdCB?: (id: string) => void,
  ): Promise<IFetchBlobUploadResult>;
  deleteFile(path: string): Promise<boolean>;
}

export interface IFetchBlobUploadResult {
  taskId?: INullableId;
  path?: INullableString;
  url?: INullableString;
}

export class FetchBlobHandler implements IFetchBlobHandler {
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
  static getFileServiceProgress(taskId: string): number {
    return FetchBlobHandler.FileServiceProgress?.[taskId] || 100;
  }
  getFileServiceProgress(taskId: string): number {
    return FetchBlobHandler.getFileServiceProgress(taskId);
  }
  async getFileStat(path: string): Promise<RNFetchBlobStat> {
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
