import {
  FetchBlobHandler,
  IApiMeta,
  IFetchBlobHandler,
  IFileMetaToDownload,
} from './FetchBlob';
import { BackgroundService, IBackgroundService } from './BackgroundService';
import type { IQueueFactory } from './queue/interface';
import { QueueFactory } from './queue/QueueFactory';
import { logError, logWarn } from './Logger';

export type IFileManagerPayload = {
  apiMeta: IApiMeta;
  fileMeta: IFileMetaToDownload | null;
  downloadProgressCB?: (percent: number) => void;
  getTaskIdCB?: (id: string) => void;
};

interface IFileManagerService {
  readonly mFetchBLobService: IFetchBlobHandler;
  readonly mBackgroundService: IBackgroundService;
  readonly mQueueService: IQueueFactory;

  addToDownloadQueue(payload: IFileManagerPayload): Promise<boolean>;

  addToUploadQueue(payload: IFileManagerPayload): Promise<boolean>;

  cancelFromDownloadQueue(fileMeta): Promise<boolean>;
  cancelFromUploadQueue(fileMeta): Promise<boolean>;

  fileIsExistInPath(path: string): Promise<boolean>;
  downloadFile(payload: IFileManagerPayload): Promise<boolean>;
  uploadFile(payload: IFileManagerPayload): Promise<boolean>;
}

export class FileManagerService implements IFileManagerService {
  readonly mBackgroundService: IBackgroundService;
  readonly mFetchBLobService: IFetchBlobHandler;
  readonly mQueueService: IQueueFactory;
  constructor() {
    this.mBackgroundService = new BackgroundService();
    this.mFetchBLobService = new FetchBlobHandler();
    this.mQueueService = new QueueFactory();
    this.mQueueService
      .queueFactory()
      .then(() => {
        logWarn(this.mQueueService, 'queueFactory 1');
        this.addQueueDownloadWorker();
      })
      .catch(e => logWarn(e, 'queueFactory 2'));
  }
  addQueueDownloadWorker() {
    logWarn(this.mQueueService, 'addQueueDownloadWorker');
    this.mQueueService.addWorker(
      'download_worker',
      async (id, payload: IFileManagerPayload) => {
        logWarn(payload, 'addWorker');
        try {
          await this.mBackgroundService.start(
            async () => {
              /**
               * apiMeta: IApiMeta,
               * fileMeta: IFileMetaToDownload | null,
               * downloadProgressCB?: (percent: number) => void,
               * getTaskIdCB?: (id: string) => void,
               */
              try {
                const {
                  apiMeta,
                  fileMeta,
                }: // getTaskIdCB,
                // downloadProgressCB,
                IFileManagerPayload = payload;
                await this.mFetchBLobService.downloadManager(apiMeta, fileMeta);
              } catch (ee) {
                logError(ee, 'eee:4');
              }
              return true;
            },
            {
              taskName: payload.fileMeta?.taskId,
              taskTitle: payload.fileMeta?.fileName + ' is Downloading',
              progressBar: {
                max: 100,
                value: 0,
              },
            },
          );
          return true;
        } catch (e) {
          logError(e, 'eee:3');
          return false;
        }
      },
    );
  }
  async addToDownloadQueue(payload: IFileManagerPayload): Promise<boolean> {
    try {
      await this.mQueueService.addJob('download_worker', payload);
    } catch (e) {
      logError(e, 'eee:2');
      return false;
    }
  }

  addToUploadQueue(fileMeta: any): Promise<boolean> {
    return Promise.resolve(false);
  }

  cancelFromDownloadQueue(fileMeta): Promise<boolean> {
    return Promise.resolve(false);
  }

  cancelFromUploadQueue(fileMeta): Promise<boolean> {
    return Promise.resolve(false);
  }

  async downloadFile(payload: IFileManagerPayload): Promise<boolean> {
    try {
      await this.addToDownloadQueue(payload);
      return true;
    } catch (e) {
      logError(e, 'eee:1');
      return false;
    }
  }

  fileIsExistInPath(path: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  uploadFile(fileMeta: any): Promise<boolean> {
    return Promise.resolve(false);
  }
}
