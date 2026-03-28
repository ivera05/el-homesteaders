import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1774560126410 implements MigrationInterface {
  name = 'InitSchema1774560126410';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "inventories"
                             (
                               "id"                  uuid      NOT NULL DEFAULT uuid_generate_v4(),
                               "available_qty"       integer   NOT NULL DEFAULT '0',
                               "pending_ship_qty"    integer   NOT NULL DEFAULT '0',
                               "shipped_qty"         integer   NOT NULL DEFAULT '0',
                               "processing_qty"      integer   NOT NULL DEFAULT '0',
                               "low_stock_threshold" integer   NOT NULL DEFAULT '5',
                               "created_at"          TIMESTAMP NOT NULL DEFAULT now(),
                               "updated_at"          TIMESTAMP NOT NULL DEFAULT now(),
                               "productId"           uuid,
                               CONSTRAINT "REL_19f6e91bd3b53e47103305f3f8" UNIQUE ("productId"),
                               CONSTRAINT "PK_7b1946392ffdcb50cfc6ac78c0e" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "categories"
                             (
                               "id"          uuid              NOT NULL DEFAULT uuid_generate_v4(),
                               "name"        character varying NOT NULL,
                               "description" text              NOT NULL,
                               "is_active"   boolean           NOT NULL,
                               "created_at"  TIMESTAMP         NOT NULL DEFAULT now(),
                               "updated_at"  TIMESTAMP         NOT NULL DEFAULT now(),
                               "parent_id"   uuid,
                               CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "category_products"
                             (
                               "id"          uuid    NOT NULL DEFAULT uuid_generate_v4(),
                               "sort_order"  integer NOT NULL,
                               "category_id" uuid    NOT NULL,
                               "product_id"  uuid    NOT NULL,
                               CONSTRAINT "PK_f0ced3e957f2edbbc572b171686" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "products"
                             (
                               "id"               uuid              NOT NULL DEFAULT uuid_generate_v4(),
                               "title"            character varying NOT NULL,
                               "description"      text              NOT NULL,
                               "price"            numeric(10, 2)    NOT NULL,
                               "image_url"        character varying NOT NULL,
                               "sku"              character varying NOT NULL,
                               "weight"           numeric(10, 2)    NOT NULL,
                               "weight_unit"      character varying NOT NULL,
                               "nutritional_info" jsonb,
                               "created_at"       TIMESTAMP         NOT NULL DEFAULT now(),
                               "updated_at"       TIMESTAMP         NOT NULL DEFAULT now(),
                               CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "order_items"
                             (
                               "id"           uuid              NOT NULL DEFAULT uuid_generate_v4(),
                               "product_name" character varying NOT NULL,
                               "price"        numeric(10, 2)    NOT NULL,
                               "quantity"     integer           NOT NULL,
                               "subtotal"     numeric(10, 2)    NOT NULL,
                               "discount"     numeric(10, 2)    NOT NULL,
                               "tax"          numeric(10, 2)    NOT NULL,
                               "total"        numeric(10, 2)    NOT NULL,
                               "created_at"   TIMESTAMP         NOT NULL DEFAULT now(),
                               "updated_at"   TIMESTAMP         NOT NULL DEFAULT now(),
                               "order_id"     uuid              NOT NULL,
                               "product_id"   uuid              NOT NULL,
                               CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled')`);
    await queryRunner.query(`CREATE TABLE "orders"
                             (
                               "id"            uuid                          NOT NULL DEFAULT uuid_generate_v4(),
                               "status"        "public"."orders_status_enum" NOT NULL DEFAULT 'pending',
                               "discount_code" character varying             NOT NULL,
                               "subtotal"      numeric(10, 2)                NOT NULL,
                               "discount"      numeric(10, 2)                NOT NULL,
                               "shipping"      numeric(10, 2)                NOT NULL,
                               "tax"           numeric(10, 2)                NOT NULL,
                               "total_amount"  numeric(10, 2)                NOT NULL,
                               "created_at"    TIMESTAMP                     NOT NULL DEFAULT now(),
                               "updated_at"    TIMESTAMP                     NOT NULL DEFAULT now(),
                               "user_id"     uuid,
                               CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "addresses"
                             (
                               "id"          uuid              NOT NULL DEFAULT uuid_generate_v4(),
                               "street"      character varying NOT NULL,
                               "street2"     character varying NOT NULL,
                               "city"        character varying NOT NULL,
                               "state"       character varying NOT NULL,
                               "postal_code" character varying NOT NULL,
                               "country"     character varying NOT NULL,
                               "is_default"  boolean           NOT NULL DEFAULT FALSE,
                               "created_at"  TIMESTAMP         NOT NULL DEFAULT now(),
                               "updated_at"  TIMESTAMP         NOT NULL DEFAULT now(),
                               "user_id"     uuid              NOT NULL,
                               CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('client', 'support', 'admin')`);
    await queryRunner.query(`CREATE TABLE "users"
                             (
                               "id"            uuid                       NOT NULL DEFAULT uuid_generate_v4(),
                               "email"         character varying          NOT NULL,
                               "password"      character varying          NOT NULL,
                               "first_name"    character varying          NOT NULL,
                               "last_name"     character varying          NOT NULL,
                               "role"          "public"."users_role_enum" NOT NULL DEFAULT 'client',
                               "is_active"     boolean                    NOT NULL DEFAULT TRUE,
                               "token_version" integer                    NOT NULL DEFAULT '1',
                               "created_at"    TIMESTAMP                  NOT NULL DEFAULT now(),
                               "updated_at"    TIMESTAMP                  NOT NULL DEFAULT now(),
                               CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                               CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TYPE "public"."api_keys_type_enum" AS ENUM('admin', 'client')`);
    await queryRunner.query(`CREATE TABLE "api_keys"
                             (
                               "id"          uuid                          NOT NULL DEFAULT uuid_generate_v4(),
                               "key"         character varying             NOT NULL,
                               "type"        "public"."api_keys_type_enum" NOT NULL DEFAULT 'client',
                               "issued_to"   character varying,
                               "description" character varying,
                               "is_active"   boolean                       NOT NULL DEFAULT TRUE,
                               "expires_at"  TIMESTAMP,
                               "created_at"  TIMESTAMP                     NOT NULL DEFAULT now(),
                               "updated_at"  TIMESTAMP                     NOT NULL DEFAULT now(),
                               CONSTRAINT "UQ_e42cf55faeafdcce01a82d24849" UNIQUE ("key"),
                               CONSTRAINT "PK_5c8a79801b44bd27b79228e1dad" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "inventories"
      ADD CONSTRAINT "FK_19f6e91bd3b53e47103305f3f84" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "categories"
      ADD CONSTRAINT "FK_88cea2dc9c31951d06437879b40" FOREIGN KEY ("parent_id") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "category_products"
      ADD CONSTRAINT "FK_d65b7eeaa7fd67a31cae4123251" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "category_products"
      ADD CONSTRAINT "FK_b8fe50cde2a330decd589403895" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "order_items"
      ADD CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "order_items"
      ADD CONSTRAINT "FK_9263386c35b6b242540f9493b00" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "orders"
      ADD CONSTRAINT "FK_505ba3689ef2763acd6c4fc93a4" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "addresses"
      ADD CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_505ba3689ef2763acd6c4fc93a4"`);
    await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_9263386c35b6b242540f9493b00"`);
    await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_145532db85752b29c57d2b7b1f1"`);
    await queryRunner.query(`ALTER TABLE "category_products" DROP CONSTRAINT "FK_b8fe50cde2a330decd589403895"`);
    await queryRunner.query(`ALTER TABLE "category_products" DROP CONSTRAINT "FK_d65b7eeaa7fd67a31cae4123251"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_88cea2dc9c31951d06437879b40"`);
    await queryRunner.query(`ALTER TABLE "inventories" DROP CONSTRAINT "FK_19f6e91bd3b53e47103305f3f84"`);
    await queryRunner.query(`DROP TABLE "api_keys"`);
    await queryRunner.query(`DROP TYPE "public"."api_keys_type_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "addresses"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    await queryRunner.query(`DROP TABLE "order_items"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "category_products"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "inventories"`);
  }

}
