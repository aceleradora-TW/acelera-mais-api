import { MigrationInterface, QueryRunner } from "typeorm"

export class firstMigration1657112185968 implements MigrationInterface {
  name = "firstMigration1657112185968"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "evaluation" ("id" SERIAL NOT NULL, "mentor_name" character varying, "feedback" character varying, "score" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_b72edd439b9db736f55b584fa54" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "exercise" ("id" SERIAL NOT NULL, "name" character varying, "type" character varying, "link" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "challenge_id" integer, "evaluation_id" integer, CONSTRAINT "REL_cc1758dae34530228d8623fe68" UNIQUE ("evaluation_id"), CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "challenge" ("id" SERIAL NOT NULL, "time_stamp" TIMESTAMP WITH TIME ZONE, "address_email" character varying NOT NULL, "name" character varying, "phone" character varying, "challenge" character varying, "file_type" character varying, "file_zip" character varying, "file_github" character varying, "have_computer" character varying, "have_internet" character varying, "have_webcam" character varying, "can_use_webcam" character varying, "exercise_statement" character varying, "city_state" character varying, "type" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "hiring_process_id" integer, CONSTRAINT "PK_5f31455ad09ea6a836a06871b7a" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "hiring_process" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_67dfff18277bc7118d2189f42b5" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "candidate" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "time_stamp" TIMESTAMP WITH TIME ZONE NOT NULL, "address_email" character varying NOT NULL, "name" character varying, "phone" character varying NOT NULL, "birth_date" TIMESTAMP WITH TIME ZONE NOT NULL, "genre" character varying NOT NULL, "skin_color" character varying NOT NULL, "instituition_name" character varying NOT NULL, "course_name" character varying NOT NULL, "milestone" character varying NOT NULL, "how_found" character varying NOT NULL, "expectation" character varying NOT NULL, "motivation" character varying NOT NULL, "curriculum" character varying NOT NULL, "ok_CI" boolean NOT NULL, "city" character varying NOT NULL, "sexual_orientation" character varying NOT NULL, "photo" character varying NOT NULL, "dev_profile" character varying NOT NULL, "equipment" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "hiring_process_id" integer, "challenge_id" integer, CONSTRAINT "REL_1efb3c45ca3531f1a9c423f644" UNIQUE ("challenge_id"), CONSTRAINT "PK_b0ddec158a9a60fbc785281581b" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "incomplete_candidate" ("id" SERIAL NOT NULL, "adress_email" character varying NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "hiring_process_id" integer, CONSTRAINT "PK_5c0d2f41765d42d959beb46379d" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "telephone" character varying NOT NULL, "type" character varying NOT NULL, "password" character varying NOT NULL, "flag" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "exercise" ADD CONSTRAINT "FK_b79d898820d2f4cffb6893e9281" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "exercise" ADD CONSTRAINT "FK_cc1758dae34530228d8623fe68f" FOREIGN KEY ("evaluation_id") REFERENCES "evaluation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "challenge" ADD CONSTRAINT "FK_9af752e3a9c7d42672d8b48654d" FOREIGN KEY ("hiring_process_id") REFERENCES "hiring_process"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "candidate" ADD CONSTRAINT "FK_3ab9f85c5cd9a44931626095305" FOREIGN KEY ("hiring_process_id") REFERENCES "hiring_process"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "candidate" ADD CONSTRAINT "FK_1efb3c45ca3531f1a9c423f6440" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "incomplete_candidate" ADD CONSTRAINT "FK_260ec0762d19975c901c14defab" FOREIGN KEY ("hiring_process_id") REFERENCES "hiring_process"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "incomplete_candidate" DROP CONSTRAINT "FK_260ec0762d19975c901c14defab"`
    )
    await queryRunner.query(
      `ALTER TABLE "candidate" DROP CONSTRAINT "FK_1efb3c45ca3531f1a9c423f6440"`
    )
    await queryRunner.query(
      `ALTER TABLE "candidate" DROP CONSTRAINT "FK_3ab9f85c5cd9a44931626095305"`
    )
    await queryRunner.query(
      `ALTER TABLE "challenge" DROP CONSTRAINT "FK_9af752e3a9c7d42672d8b48654d"`
    )
    await queryRunner.query(
      `ALTER TABLE "exercise" DROP CONSTRAINT "FK_cc1758dae34530228d8623fe68f"`
    )
    await queryRunner.query(
      `ALTER TABLE "exercise" DROP CONSTRAINT "FK_b79d898820d2f4cffb6893e9281"`
    )
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TABLE "incomplete_candidate"`)
    await queryRunner.query(`DROP TABLE "candidate"`)
    await queryRunner.query(`DROP TABLE "hiring_process"`)
    await queryRunner.query(`DROP TABLE "challenge"`)
    await queryRunner.query(`DROP TABLE "exercise"`)
    await queryRunner.query(`DROP TABLE "evaluation"`)
  }
}
