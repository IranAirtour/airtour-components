import queueFactory from 'react-native-queue';
import type { IJobOptions, IQueueFactory, IWorkerOptions } from './interface';
const DefaultWorkerOptions: Partial<IWorkerOptions> = {
  // Set max number of jobs for this worker to process concurrently.
  // Defaults to 1.
  concurrency: 4,

  // JOB LIFECYCLE CALLBACKS

  // onStart job callback handler is fired when a job begins processing.
  //
  // IMPORTANT: Job lifecycle callbacks are executed asynchronously and do not block job processing
  // (even if the callback returns a promise it will not be "awaited" on).
  // As such, do not place any logic in onStart that your actual job worker function will depend on,
  // this type of logic should of course go inside the job worker function itself.
  // onStart: async (id, payload) => {
  //   return Promise.resolve(true);
  // },
  // onSuccess job callback handler is fired after a job successfully completes processing.
  // onSuccess: async (id, payload) => {
  //   return Promise.resolve(true);
  // },
  // //
  // // // onFailure job callback handler is fired after each time a job fails (onFailed also fires if job has reached max number of attempts).
  // // onFailure: async (id, payload) => {
  // //   return Promise.resolve(false);
  // // },
  // //
  // // // onFailed job callback handler is fired if job fails enough times to reach max number of attempts.
  // onFailed: async (id, payload) => {
  //   return Promise.reject(false);
  // },

  // onComplete job callback handler fires after job has completed processing successfully or failed entirely.
  // onComplete: async (id, payload) => {
  //   await sleep(50);
  //   return true;
  // },
};
export class QueueFactory implements IQueueFactory {
  queue: any = null;
  workersToAppend: Map<string, any> = new Map<string, any>();
  jobsToAppend: Map<string, any> = new Map<string, any>();
  async queueFactory(): Promise<boolean> {
    try {
      this.queue = await queueFactory();
      this.appendToQueue();
      return true;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  appendToQueue(): void {
    // works and jobs that are not appended to Queue yet
    this.workersToAppend.forEach((value, key) => {
      this.addWorker(key, value.payload, value.options);
    });
    this.workersToAppend.clear();
    this.jobsToAppend.forEach((value, key) => {
      this.addJob(key, value.payload, value.options, true);
    });
    this.jobsToAppend.clear();
  }
  addWorker(
    workerName: string,
    work: (id: number, payload: any) => void,
    options: IWorkerOptions = DefaultWorkerOptions as IWorkerOptions,
  ): void {
    if (!this?.queue) {
      this.workersToAppend.set(workerName, {
        payload: work,
        options: options ?? {},
      });
      return;
    }
    // Worker has to be defined before related jobs can be added to queue.
    this.queue?.addWorker(
      workerName,
      async (id: number, payload: any) => {
        // for delete job from queue
        // return {ok: boolean};
        try {
          await work(id, payload);
          return { ok: true };
        } catch (e) {
          return { ok: false };
        }
      },
      options,
    );
    // this.queue?.addWorker(workerName, work, options);
  }
  async start(ms?: number): Promise<boolean> {
    // Start the queue with a lifespan
    // IMPORTANT: OS background tasks are limited to 30 seconds or less.
    try {
      await this.queue?.start(ms || 20000);
      return true;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  addJob(
    jobName: string,
    payload: any = {},
    options: IJobOptions = { attempts: 4, timeout: 10000 },
    startQueue: boolean = true,
  ): void {
    if (!this?.queue) {
      this.jobsToAppend.set(jobName, {
        payload: payload,
        options: options,
      });
      return;
    }
    this.queue?.createJob(jobName, payload, options, startQueue);
  }
}

export const QueueFactoryClient = new QueueFactory();
