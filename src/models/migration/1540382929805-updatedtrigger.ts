import { MigrationInterface, QueryRunner } from 'typeorm';

export class Updatedtrigger1540382929805 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = now();
            RETURN NEW;
        END;
        $$ language 'plpgsql';
        `)

  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP FUNCTION updated_at_column')
  }

}
