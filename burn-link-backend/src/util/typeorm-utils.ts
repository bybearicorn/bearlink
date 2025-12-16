import { QueryRunner } from "typeorm";

export const pgTimestampDefaults = {
  type: "timestamp",
  precision: 3,
} as const;

export const setSchema = async (queryRunner: QueryRunner) => {
  // for typecheck
  if (queryRunner.connection.options.type === "postgres") {
    const schema = queryRunner.connection.options.schema || "public";
    await queryRunner.query(`set search_path to '${schema}'`);
  }
};
