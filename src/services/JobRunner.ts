import { RedisMemoryServer } from "redis-memory-server";
import Queue from "bee-queue";
import { addSeconds } from "date-fns";
import { Logger } from "winston";

export interface JobDefinition<T> {
  name: string;
  process: (data: T) => Promise<void>;
}

export interface JobOptions {
  timeout?: number;
  retries?: number;
  delaySeconds?: number;
}

const applyJobOptionsDefaults = (options?: JobOptions) => {
  const timeout = options?.timeout !== undefined ? options.timeout : 3000;
  const retries = options?.retries !== undefined ? options.retries : 3;
  const delaySeconds = options?.delaySeconds !== undefined ? options.delaySeconds : 0;

  return {
    timeout,
    retries,
    delaySeconds,
  };
};

export interface JobRunner {
  registerJob: <T>(job: JobDefinition<T>) => Promise<void>;
  triggerJob: <T>(name: string, data: T, options?: JobOptions) => Promise<void>;
}

export class InMemoryJobRunner implements JobRunner {
  private logger: Logger;
  private jobQueues: Record<string, Queue> = {};
  private redisServer: RedisMemoryServer;

  constructor(logger: Logger) {
    this.logger = logger;
    this.redisServer = new RedisMemoryServer();
  }

  async registerJob<T>(job: JobDefinition<T>) {
    this.logger.debug("InMemoryJobRunner.registerJob", job, job.process);

    const host = await this.redisServer.getHost();
    const port = await this.redisServer.getPort();

    const queue = new Queue(job.name, {
      redis: {
        host,
        port,
      },
      activateDelayedJobs: true,
    });

    this.jobQueues[job.name] = queue;

    queue.process(async (queueJob) => job.process(queueJob.data));
  }

  async triggerJob<T>(name: string, data: T, options?: JobOptions) {
    this.logger.debug("InMemoryJobRunner.triggerJob", name, data, options);

    const queue = this.jobQueues[name];
    if (!queue) throw `No job queue registered for ${name}`;

    const job = queue.createJob(data);

    const { timeout, retries, delaySeconds } = applyJobOptionsDefaults(options);

    job.timeout(timeout);
    job.retries(retries);

    if (delaySeconds > 0) {
      const delayUntilTime = addSeconds(Date.now(), delaySeconds);
      job.delayUntil(delayUntilTime);
    }

    job.on("succeeded", () => this.logger.info(`JobRunner: succeeded ${name}`));
    job.on("retrying", (error) => this.logger.info(`JobRunner: retrying ${error}`));
    job.on("failed", (error) => this.logger.error(`JobRunner: error ${error}`));

    this.logger.debug(`triggering job: ${JSON.stringify({ name, delaySeconds, timeout, retries })}`);

    job.save();
  }
}
