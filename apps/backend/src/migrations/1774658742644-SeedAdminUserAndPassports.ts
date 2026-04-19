import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedAdminUserAndPassports1774658742644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const email = 'elh@mail.com';
    const passwordHash = await bcrypt.hash('elh_P@ss', 10);

    await queryRunner.query(
      `INSERT INTO "users" ("email",
                            "password",
                            "first_name",
                            "last_name",
                            "role",
                            "created_at",
                            "updated_at")
       VALUES ($1,
               $2,
               $3,
               $4,
               'admin',
               NOW(),
               NOW())
       ON CONFLICT ("email") DO NOTHING`,
      [email, passwordHash, 'admin', 'admin'],
    );

    await queryRunner.query(
      `INSERT INTO "api_keys" ("key",
                               "type",
                               "issued_to",
                               "description",
                               "is_active",
                               "created_at",
                               "updated_at")
       VALUES ($1,
               'client',
               'Initial Client Key',
               'Automatically generated API key for client access',
               TRUE,
               NOW(),
               NOW())
       ON CONFLICT ("key") DO NOTHING`,
      ['ff2c4c9d-d53c-45e7-bece-97c99a881132'],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE
       FROM "users"
       WHERE "email" = $1`,
      ['elh@mail.com'],
    );

    await queryRunner.query(
      `DELETE
       FROM "api_keys"
       WHERE "key" = $1`,
      ['ff2c4c9d-d53c-45e7-bece-97c99a881132'],
    );
  }
}
