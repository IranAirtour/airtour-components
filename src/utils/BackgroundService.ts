import BG from 'react-native-background-actions';
import type { BackgroundTaskOptions } from 'react-native-background-actions';
import { logError } from './Logger';
import { sleep } from './AsyncUtils';

export interface IBackgroundService {
  mOptions: BackgroundTaskOptions;
  onExpiration(): void;
  serviceIsRunning(): boolean;
  start(cb: any, options?: Partial<BackgroundTaskOptions>): Promise<void>;
  stop(): Promise<void>;
  updateNotification(options?: Partial<BackgroundTaskOptions>): Promise<void>;
}

export class BackgroundService implements IBackgroundService {
  mOptions: BackgroundTaskOptions = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    progressBar: {
      max: 100,
      value: 0,
      indeterminate: false,
    },
    // parameters:{
    //   okay:'dd'
    // }
    // linkingURI:'ir.crewiranairtour://chat/1'
  };
  constructor() {
    this.onExpiration();
  }
  onExpiration(): void {
    BG.on('expiration', () => {
      logError('BG expiration ');
    });
  }
  serviceIsRunning(): boolean {
    return BG.isRunning();
  }
  async veryIntensiveTask(cb: any) {
    logError(cb, 'cb:::');
    try {
      await new Promise(async resolve => {
        for (let i = 0; this.serviceIsRunning(); i++) {
          await cb();
          await sleep(100);
          // await this.stop();
          resolve();
        }
      });
    } catch (e) {
      logError(e, 'BG start 100');
    }
  }
  async start(
    cb: any,
    options?: Partial<BackgroundTaskOptions>,
  ): Promise<void> {
    try {
      if (typeof cb === 'function') {
        await BG.start(this.veryIntensiveTask.call(this, cb), {
          ...this.mOptions,
          ...(options ?? {}),
        });
      }
    } catch (e) {
      logError(e, 'BG start 1');
    }
  }

  async stop(): Promise<void> {
    try {
      await BG.stop();
    } catch (e) {
      logError(e?.toString(), 'stop');
    }
  }

  async updateNotification(
    options: Partial<BackgroundTaskOptions>,
  ): Promise<void> {
    try {
      await BG.updateNotification({ ...this.mOptions, ...(options ?? {}) });
    } catch (e) {
      logError(e?.toString(), 'updateNotification');
    }
  }
}
