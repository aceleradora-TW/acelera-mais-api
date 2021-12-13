import { MigrationInterface, QueryRunner } from 'typeorm'

export default class criaTabelasBanco1637593089356 implements MigrationInterface {
  name = 'criaTabelasBanco1637593089356'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "hiring_process" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, CONSTRAINT "PK_67dfff18277bc7118d2189f42b5" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "candidate" ("id" SERIAL NOT NULL, "time_stamp" TIMESTAMP WITH TIME ZONE NOT NULL, "address_email" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "birth_date" TIMESTAMP WITH TIME ZONE NOT NULL, "genre" character varying NOT NULL, "skin_color" character varying NOT NULL, "instituition_name" character varying NOT NULL, "course_name" character varying NOT NULL, "milestone" character varying NOT NULL, "how_found" character varying NOT NULL, "expectation" character varying NOT NULL, "motivation" character varying NOT NULL, "curriculum" character varying NOT NULL, "ok_CI" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, "hiring_process_id" integer, CONSTRAINT "PK_b0ddec158a9a60fbc785281581b" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "evaluation" ("id" SERIAL NOT NULL, "mentor_name" character varying NOT NULL, "feedback" character varying NOT NULL, "score" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, CONSTRAINT "PK_b72edd439b9db736f55b584fa54" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "spreadsheet" ("id" SERIAL NOT NULL, "hiring_process_id" integer NOT NULL, "time_stamp" TIMESTAMP WITH TIME ZONE NOT NULL, "adress_email" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "birth_date" TIMESTAMP WITH TIME ZONE NOT NULL, "genre" character varying NOT NULL, "skin_color" character varying NOT NULL, "instituition_name" character varying NOT NULL, "course_name" character varying NOT NULL, "milestone" character varying NOT NULL, "how_found" character varying NOT NULL, "expectation" character varying NOT NULL, "motivation" character varying NOT NULL, "curriculum" character varying NOT NULL, "ok_CI" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, CONSTRAINT "PK_cf23a0f2f0d0c63dabc0e65e020" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "candidate" ADD CONSTRAINT "FK_3ab9f85c5cd9a44931626095305" FOREIGN KEY ("hiring_process_id") REFERENCES "hiring_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "spreadsheet" ADD CONSTRAINT "FK_20034e6b14be25b76552dbcf51d" FOREIGN KEY ("hiring_process_id") REFERENCES "hiring_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('CREATE TABLE "exercise" ("id" SERIAL NOT NULL, "type" character varying NOT NULL,   PRIMARY KEY ("id"))')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "spreadsheet" DROP CONSTRAINT "FK_20034e6b14be25b76552dbcf51d"')
    await queryRunner.query('ALTER TABLE "candidate" DROP CONSTRAINT "FK_3ab9f85c5cd9a44931626095305"')
    await queryRunner.query('DROP TABLE "spreadsheet"')
    await queryRunner.query('DROP TABLE "evaluation"')
    await queryRunner.query('DROP TABLE "candidate"')
    await queryRunner.query('DROP TABLE "hiring_process"')
  }
}
