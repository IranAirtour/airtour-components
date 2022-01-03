import {
  FetchBlobClient,
  FetchBlobHandler,
  IApiMeta,
  IFileMetaToDownload,
} from './FetchBlob';
import RNBackgroundDownloader from 'react-native-background-downloader';
import { EventRegister } from './EventRegister';
import { logDebug, logError, logWarn } from './Logger';
import { BackgroundService, IBackgroundService } from './BackgroundService';
import { stringify } from './StringUtils';
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
export interface IBackgroundDownloadPayload
  extends IApiMeta,
    IFileMetaToDownload {}

export interface IBackgroundTask {
  id: string;
  pause(): void;
  resume(): void;
  stop(): void;
  percent: number;
  begin(expectedBytes?: number): void;
}

export interface IBackgroundDownloadService {
  taskQueue: Map<string | number, IBackgroundTask>;
  BACKGROUND_DOWNLOAD_EVENT: string;
  backgroundService: IBackgroundService;
  download(payload: IBackgroundDownloadPayload): Promise<boolean>;
  pauseDownload(taskId: string): Promise<boolean>;
  resumeDownload(taskId: string): Promise<boolean>;
  stopDownload(taskId: string): Promise<boolean>;
  isInDownloadQueue(taskId: string): boolean;
  emitEvent(eventPayload: IBackgroundDownloadEventPayload): void;
}

export class BackgroundDownloadService implements IBackgroundDownloadService {
  static BACKGROUND_DOWNLOAD_EVENT: string = 'BACKGROUND_DOWNLOAD_EVENT';
  static taskQueue: Map<string, IBackgroundTask> = new Map();
  static backgroundService: IBackgroundService = new BackgroundService();
  static fetchBlob = new FetchBlobHandler();

  static async download(
    meta: IBackgroundDownloadPayload,
    unfinishedTask?: IBackgroundTask,
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const taskId = meta?.taskId || unfinishedTask?.id;
        // await BackgroundDownloadService.backgroundService.start(
        //   () => {
        //     return new Promise(async resolve => {
        //       try {
        // if (!BackgroundDownloadService.isInDownloadQueue(taskId)) {
        // }
        logDebug(meta, 'download file with taskID:' + taskId);
        const progress = Number(unfinishedTask?.percent ?? 0) * 100;
        logDebug(progress, 'download progress file file with taskID:' + taskId);
        BackgroundDownloadService.emitEvent({
          taskId,
          progress: progress,
          subEvent: BackgroundDownloadServiceEvents.DOWNLOAD_BEGIN,
        });
        const task = unfinishedTask
          ? unfinishedTask
          : RNBackgroundDownloader.download({
              id: taskId,
              url: meta.url,
              destination: meta.pathToDownload,
            });
        BackgroundDownloadService.taskQueue.set(taskId, task);
        if (task?.resume) {
          task.resume();
        }
        if (task?.begin) {
          task.begin(expectedBytes => {
            logDebug(
              expectedBytes,
              'Downloading total byte for taskId ' + taskId + ' :',
            );
          });
        }
        task
          .progress((_, bytesWritten, totalBytes) => {
            const percent = Number(bytesWritten / meta?.fileSize ?? 1);
            logDebug(totalBytes, 'Downloading : totalBytes');
            logDebug(percent, 'Downloading : percent2' + taskId);
            const progress = Math.max(
              Math.ceil(percent?.toPrecision(2) * 100),
              0,
            );
            BackgroundDownloadService.emitEvent({
              taskId,
              progress: progress,
              subEvent: BackgroundDownloadServiceEvents.DOWNLOAD_PROGRESS,
            });
          })
          .done(() => {
            logDebug('done', 'Downloading : ' + taskId);
            BackgroundDownloadService.emitEvent({
              taskId,
              progress: 100,
              subEvent: BackgroundDownloadServiceEvents.DOWNLOAD_DONE,
            });
            resolve();
          })
          .error(error => {
            logError(
              error?.toString() + '  url:' + meta?.url + '  ' + stringify(meta),
              'BackgroundDownloadService err' + taskId,
            );
            BackgroundDownloadService.emitEvent({
              taskId,
              progress: 0,
              subEvent: BackgroundDownloadServiceEvents.DOWNLOAD_FAIL,
            });
            if (
              error?.toString().indexOf('HTTP_NOT_FOUND') > -1 &&
              meta?.pathToDownload
            ) {
              BackgroundDownloadService.fetchBlob.deleteFile(
                meta?.pathToDownload,
              );
            }
            reject('Failed to download file');
          });
        // } catch (e) {
        //   logError(e?.toString(), 'fff');
        // }
        //     });
        //   },
        //   {
        //     taskName: taskId,
        //     taskTitle: 'File:' + taskId,
        //     progressBar: {
        //       max: 100,
        //       value: unfinishedTask?.percent ?? 0,
        //       indeterminate: false,
        //     },
        //   },
        // );
      } catch (ee) {
        logError(ee?.toString(), 'eeeee');
        reject('Download Error');
      }
    });
  }

  static async pauseDownload(taskId: string): Promise<boolean> {
    try {
      const task: IBackgroundTask =
        await BackgroundDownloadService.getDownloadFromQueue(taskId);
      logError(task, 'task pause');
      task?.pause?.();
      return true;
    } catch (e) {
      logError(e?.toString(), 'pauseDownload');
      return false;
    }
  }

  static async resumeDownload(taskId: string): Promise<boolean> {
    try {
      const task: IBackgroundTask =
        await BackgroundDownloadService.getDownloadFromQueue(taskId);
      task.resume();
      return true;
    } catch (e) {
      logError(e?.toString(), 'resumeDownload');
      return false;
    }
  }

  static async stopDownload(taskId: string): Promise<boolean> {
    try {
      const task: IBackgroundTask =
        await BackgroundDownloadService.getDownloadFromQueue(taskId);
      task.stop();
      return true;
    } catch (e) {
      logError(e?.toString(), 'stopDownload');
      return false;
    }
  }

  static async getDownloadFromQueue(taskId: string): Promise<IBackgroundTask> {
    if (BackgroundDownloadService.isInDownloadQueue(taskId)) {
      return Promise.resolve(BackgroundDownloadService.taskQueue.get(taskId));
    }
    return Promise.reject('no task id is in queue for taskId:' + taskId);
  }
  static emitEvent(eventPayload: IBackgroundDownloadEventPayload): void {
    EventRegister.emit(
      BackgroundDownloadService.BACKGROUND_DOWNLOAD_EVENT,
      eventPayload,
    );
    BackgroundDownloadService.updateNotificationManager(
      eventPayload.taskId,
      eventPayload.progress,
    );
  }

  static isInDownloadQueue(taskId: string): boolean {
    logDebug(
      Array.from(BackgroundDownloadService.taskQueue.keys()),
      'BackgroundDownloadService.taskQueue.keys',
    );
    return BackgroundDownloadService.taskQueue.has(taskId);
  }
  static async reAttachDownloads(links: any[]): Promise<boolean> {
    try {
      const lostTasks =
        await RNBackgroundDownloader.checkForExistingDownloads();
      logError(lostTasks, 'lostTasks');
      for (let task of lostTasks) {
        if (task?.id) {
          const obj = links.find(d => (d.id = task.id));
          logWarn(obj, 'obj');
          if (obj) {
            const fileName: string = obj.id + '.apk';
            BackgroundDownloadService.download(
              {
                mimeType: 'apk',
                url: obj.link,
                pathToDownload:
                  FetchBlobClient.getChatPath().toString() + fileName,
                fileName: fileName,
              },
              task,
            );
          }
        }
      }
      return true;
    } catch (e) {
      logError(e?.toString(), 'reAttachDownloads');
      return false;
    }
  }
  static setHeaders(headers: any): void {
    RNBackgroundDownloader.setHeaders(headers);
  }
  static updateNotificationManager(taskId: string, percent: number): void {
    logError(percent);
    // BackgroundDownloadService.backgroundService.updateNotification({
    //   taskName: taskId,
    //   taskTitle: 'File:' + taskId,
    //   progressBar: {
    //     max: 100,
    //     value: percent,
    //     indeterminate: false,
    //   },
    // });
  }
  static stopService() {
    BackgroundDownloadService.backgroundService.stop();
  }
}
