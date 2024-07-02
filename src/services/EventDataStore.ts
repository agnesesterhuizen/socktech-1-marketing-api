interface EventAction {
  subject: string;
  body: string;
  delaySeconds?: number;
}

export interface EventActionsDataStore {
  getAction(eventName: string): Promise<EventAction>;
}

export class InMemoryEventActionsDataStore implements EventActionsDataStore {
  async getAction(eventName: string): Promise<EventAction> {
    return { subject: "", body: "" };
  }
}
