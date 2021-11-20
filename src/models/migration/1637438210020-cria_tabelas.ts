import { MigrationInterface, QueryRunner } from 'typeorm'

export default class criaTabelas1637438210020 implements MigrationInterface {
  name = 'criaTabelas1637438210020'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "hiring_process" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, CONSTRAINT "PK_67dfff18277bc7118d2189f42b5" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "candidate" ("id" SERIAL NOT NULL, "time_stamp" TIMESTAMP WITH TIME ZONE NOT NULL, "adress_email" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "birth_date" TIMESTAMP WITH TIME ZONE NOT NULL, "genre" character varying NOT NULL, "skin_color" character varying NOT NULL, "instituition_name" character varying NOT NULL, "course_name" character varying NOT NULL, "milestone" character varying NOT NULL, "how_found" character varying NOT NULL, "expectation" character varying NOT NULL, "motivation" character varying NOT NULL, "curriculum" character varying NOT NULL, "ok_CI" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (\'now\'::text)::timestamp(6) with time zone, "hiring_process_id" integer, CONSTRAINT "PK_b0ddec158a9a60fbc785281581b" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "candidate" ADD CONSTRAINT "FK_3ab9f85c5cd9a44931626095305" FOREIGN KEY ("hiring_process_id") REFERENCES "hiring_process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "candidate" DROP CONSTRAINT "FK_3ab9f85c5cd9a44931626095305"')
    await queryRunner.query('DROP TABLE "candidate"')
    await queryRunner.query('DROP TABLE "hiring_process"')
  }
}
