import { EmailProvider } from "../services/EmailProvider";
import { JobDefinition, JobOptions, JobRunner } from "../services/JobRunner";

export class MockJobRunner implements JobRunner {
  async allQueuesReady() {
    return true;
  }
  allJobsComplete: () => true;
  async registerJob<T>(job: JobDefinition<T>) {}
  async triggerJob<T>(name: string, data: T, options?: JobOptions) {}
}

export class MockEmailProvider implements EmailProvider {
  async sendEmail(address: string, subject: string, body: string) {
    return new Promise<void>((resolve) => resolve(null));
  }
}
