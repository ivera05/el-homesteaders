import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedAdminUser1774142408419 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const email = 'elh@mail.com';
    const passwordHash = await bcrypt.hash('elh_P@ss', 10);

    await queryRunner.query(
      `INSERT INTO "users" (
        "email",
        "password",
        "first_name",
        "last_name",
        "role",
        "token_version",
        "created_at",
        "updated_at"
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        'admin',
        1,
        NOW(),
        NOW()
      )
      ON CONFLICT ("email") DO NOTHING`,
      [email, passwordHash, 'admin', 'admin'],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "users" WHERE "email" = $1`, [
      'elh@mail.com',
    ]);
  }
}
