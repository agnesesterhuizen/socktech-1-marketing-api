// EmailAction represents an email to be sent when an event is triggered
interface EmailAction {
  subject: string;
  body: string;
  delaySeconds?: number;
}

// EmailActionDataStore is a lookup table of "eventName" => array of EmailAction
export type EmailActionDataStore = Record<string, EmailAction[]>;

export interface EmailActionDataService {
  getActions(eventName: string): Promise<EmailAction[]>;
}

export class InMemoryEmailActionDataService implements EmailActionDataService {
  private actions: EmailActionDataStore = {};

  constructor(actions: EmailActionDataStore) {
    this.actions = actions;
  }

  async getActions(eventName: string): Promise<EmailAction[]> {
    return this.actions[eventName] || [];
  }
}
