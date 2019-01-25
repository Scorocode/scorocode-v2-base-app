import { MigrationInterface, QueryRunner } from 'typeorm';

export class Example1540384585120 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        CREATE TABLE example
        (
            id_example uuid default uuid_generate_v4() PRIMARY KEY NOT NULL,
            ftext text UNIQUE NOT NULL CHECK (TRIM(ftext) <> ''),
            fbyte bytea NOT NULL,
            created_at timestamp with time zone default current_timestamp,
            updated_at timestamp with time zone default current_timestamp
        )`)

    await queryRunner.query(`
        CREATE TRIGGER example_updated_at_column
        BEFORE UPDATE ON example
        FOR EACH ROW EXECUTE PROCEDURE updated_at_column()`)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TRIGGER example_updated_at_column')
    await queryRunner.query('DROP TABLE example')
  }

}
