import { MigrationInterface, QueryRunner } from "typeorm";
import { setSchema } from "../util/typeorm-utils";

export class CreateBurnlinkTable1745434420166 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await setSchema(queryRunner);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS burn_link (
        id                  INTEGER PRIMARY KEY,
        message             VARCHAR NOT NULL,
        created             TIMESTAMP NOT NULL,
        expires             TIMESTAMP
      );
    `);
  }

  public async down(): Promise<void> {
    throw new Error("Revert not supported (down method not implemented)");
  }
}
