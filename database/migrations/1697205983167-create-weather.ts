import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWeather1697205983167 implements MigrationInterface {
  public name = 'CreateWeather1697205983167';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Weather" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "timezone" character varying NOT NULL, "timezoneOffset" integer NOT NULL, "current" jsonb, "minutely" jsonb, "hourly" jsonb, "daily" jsonb, "alerts" jsonb, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_12e813fbeb1566f63a1b31ace4d" PRIMARY KEY ("id"))`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
