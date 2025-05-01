import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1746087336245 implements MigrationInterface {
    name = ' $npmConfigName1746087336245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "usn" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "usn"`);
    }

}
