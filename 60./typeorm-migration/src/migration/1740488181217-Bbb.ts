import { MigrationInterface, QueryRunner } from "typeorm";

export class Bbb1740488181217 implements MigrationInterface {
    name = 'Bbb1740488181217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`age\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`age\``);
    }

}
