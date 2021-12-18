export interface IJobOptions {
  // Number of times to attempt a failing job before marking job as failed and moving on.
  // Defaults to 1.
  attempts?: number;
  // Higher priority jobs (10) get processed before lower priority jobs (-10).
  // Any int will work, priority 1000 will be processed before priority 10, though this is probably overkill.
  // Defaults to 0.
  priority?: number;
  // Timeout in ms before job is considered failed.
  // Use this setting to kill off hanging jobs that are clogging up
  // your queue, or ensure your jobs finish in a timely manner if you want
  // to execute jobs in OS background tasks.
  //
  // IMPORTANT: Jobs are required to have a timeout > 0 set in order to be processed
  // by a queue that has been started with a lifespan. As such, if you want to process
  // jobs in an OS background task, you MUST give the jobs a timeout setting.
  //
  // Setting this option to 0 means never timeout.
  //
  // Defaults to 25000.
  timeout?: number;
}

export interface IQueueFactory {
  queue: any;
  addWorker(
    workerName: string,
    work: (id: number, payload: any) => Promise<boolean>,
    workerOptions?: IWorkerOptions,
  ): void;
  queueFactory(): Promise<boolean>;
  // Start the queue with a lifespan
  // IMPORTANT: OS background tasks are limited to 30 seconds or less.
  start(ms?: number): Promise<boolean>;
  addJob(
    jobName: string,
    payload: any,
    options?: IJobOptions,
    startQueue?: boolean,
  ): void;
}

export interface IWorkerOptions {
  // Set max number of jobs for this worker to process concurrently.
  // Defaults to 1.
  concurrency: number;

  // JOB LIFECYCLE CALLBACKS

  // onStart job callback handler is fired when a job begins processing.
  //
  // IMPORTANT: Job lifecycle callbacks are executed asynchronously and do not block job processing
  // (even if the callback returns a promise it will not be "awaited" on).
  // As such, do not place any logic in onStart that your actual job worker function will depend on,
  // this type of logic should of course go inside the job worker function itself.
  onStart: (id: number, payload: any) => Promise<boolean>;
  // onSuccess job callback handler is fired after a job successfully completes processing.
  onSuccess: (id: number, payload: any) => Promise<boolean>;

  // onFailure job callback handler is fired after each time a job fails (onFailed also fires if job has reached max number of attempts).
  onFailure: (id: number, payload: any) => Promise<boolean>;

  // onFailed job callback handler is fired if job fails enough times to reach max number of attempts.
  onFailed: (id: number, payload: any) => Promise<boolean>;

  // onComplete job callback handler fires after job has completed processing successfully or failed entirely.
  onComplete: (id: number, payload: any) => Promise<boolean>;
}
