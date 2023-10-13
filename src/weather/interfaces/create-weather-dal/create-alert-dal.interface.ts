export interface CreateAlertDalInterface {
  readonly senderName: string;

  readonly event: string;

  readonly start: number;

  readonly end: number;

  readonly description: string;
}
