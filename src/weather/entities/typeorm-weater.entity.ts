import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { WeatherInterface } from '../interfaces/weather/weather.interface';
import { AlertInterface } from '../interfaces/weather/alert.interface';
import { CurrentInterface } from '../interfaces/weather/current.interface';
import { DailyInterface } from '../interfaces/weather/daily.interface';
import { HourlyInterface } from '../interfaces/weather/hourly.interface';
import { MinutelyInterface } from '../interfaces/weather/minutely.interface';

@Entity('Weather')
export class TypeormWeatherEntity implements WeatherInterface {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ type: 'float8' })
  public latitude: number;

  @Column({ type: 'float8' })
  public longitude: number;

  @Column({ type: 'varchar' })
  public timezone: string;

  @Column({ type: 'int' })
  public timezoneOffset: number;

  @Column({ type: 'jsonb', nullable: true })
  public current?: CurrentInterface;

  @Column({ type: 'jsonb', nullable: true })
  public minutely?: MinutelyInterface[];

  @Column({ type: 'jsonb', nullable: true })
  public hourly?: HourlyInterface[];

  @Column({ type: 'jsonb', nullable: true })
  public daily?: DailyInterface[];

  @Column({ type: 'jsonb', nullable: true })
  public alerts?: AlertInterface[];

  @Column({ type: 'timestamp with time zone' })
  public readonly createdAt: Date;
}
