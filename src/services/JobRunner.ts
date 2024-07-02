import { RedisMemoryServer } from "redis-memory-server";
import Queue from "bee-queue";

export interface JobRunner {}

export class InMemoryJobRunner implements JobRunner {
  async init() {
    const redisServer = new RedisMemoryServer();

    const host = await redisServer.getHost();
    const port = await redisServer.getPort();

    const queue = new Queue("example", {
      redis: {
        host,
        port,
      },
    });

    const job = queue.createJob({ x: 2, y: 3 });
    job.save();
    job.on("succeeded", (result) => {
      console.log(`Received result for job ${job.id}: ${result}`);
    });

    // @ts-ignore
    queue.process(function (job, done) {
      console.log(`Processing job ${job.id}`);
      return done(null, job.data.x + job.data.y);
    });
  }
}
