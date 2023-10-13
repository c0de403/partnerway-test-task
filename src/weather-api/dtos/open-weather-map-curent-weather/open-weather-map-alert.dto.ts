export class OpenWeatherMapAlertDto {
  public readonly sender_name: string;

  public readonly event: string;

  public readonly start: number;

  public readonly end: number;

  public readonly description: string;
}
