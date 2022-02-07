import { MigrationInterface, QueryRunner } from "typeorm";

export class criaPrimeiroMigration1639308983126 implements MigrationInterface {
  name = 'criaPrimeiroMigration1639308983126'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "evaluation" ("id" SERIAL NOT NULL, "mentor_name" character varying, "feedback" character varying, "score" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_b72edd439b9db736f55b584fa54" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "challenge" ("id" SERIAL NOT NULL, "time_stamp" TIMESTAMP WITH TIME ZONE, "address_email" character varying NOT NULL, "name" character varying, "phone" character varying, "challenge" character varying, "file_type" character varying, "file_zip" character varying, "file_github" character varying, "have_computer" character varying, "have_internet" character varying, "have_webcam" character varying, "can_use_webcam" character varying, "city_state" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "hiring_process_id" integer, "challenge_id" integer, CONSTRAINT "REL_d1650f62d215bae2e6f2acdce9" UNIQUE ("challenge_id"), CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "hiring_process" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_67dfff18277bc7118d2189f42b5" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "candidate" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "time_stamp" TIMESTAMP WITH TIME ZONE NOT NULL, "address_email" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "birth_date" TIMESTAMP WITH TIME ZONE NOT NULL, "genre" character varying NOT NULL, "skin_color" character varying NOT NULL, "instituition_name" character varying NOT NULL, "course_name" character varying NOT NULL, "milestone" character varying NOT NULL, "how_found" character varying NOT NULL, "expectation" character varying NOT NULL, "motivation" character varying NOT NULL, "curriculum" character varying NOT NULL, "ok_CI" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "hiring_process_id" integer, "exericse_id" integer, CONSTRAINT "REL_5388d0834e243ab51b87e48f2b" UNIQUE ("exericse_id"), CONSTRAINT "PK_b0ddec158a9a60fbc785281581b" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_ccc93ccd1dbcc4c88d464a1cafa" FOREIGN KEY ("hiring_process_id") REFERENCES "hiring_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_d1650f62d215bae2e6f2acdce98" FOREIGN KEY ("challenge_id") REFERENCES "evaluation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "candidate" ADD CONSTRAINT "FK_3ab9f85c5cd9a44931626095305" FOREIGN KEY ("hiring_process_id") REFERENCES "hiring_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "candidate" ADD CONSTRAINT "FK_5388d0834e243ab51b87e48f2b3" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "candidate" DROP CONSTRAINT "FK_5388d0834e243ab51b87e48f2b3"`);
    await queryRunner.query(`ALTER TABLE "candidate" DROP CONSTRAINT "FK_3ab9f85c5cd9a44931626095305"`);
    await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_d1650f62d215bae2e6f2acdce98"`);
    await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_ccc93ccd1dbcc4c88d464a1cafa"`);
    await queryRunner.query(`DROP TABLE "candidate"`);
    await queryRunner.query(`DROP TABLE "hiring_process"`);
    await queryRunner.query(`DROP TABLE "challenge"`);
    await queryRunner.query(`DROP TABLE "evaluation"`);
  }

}
