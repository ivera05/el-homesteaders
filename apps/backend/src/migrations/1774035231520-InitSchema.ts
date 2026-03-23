import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1774035231520 implements MigrationInterface {
  name = 'InitSchema1774035231520';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productId" character varying NOT NULL, "product_name" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, "subtotal" numeric(10,2) NOT NULL, "discount" numeric(10,2) NOT NULL, "tax" numeric(10,2) NOT NULL, "total" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "orderId" uuid NOT NULL, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."orders_status_enum" AS ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."orders_status_enum" NOT NULL DEFAULT 'pending', "discount_code" character varying NOT NULL, "subtotal" numeric(10,2) NOT NULL, "discount" numeric(10,2) NOT NULL, "shipping_cost" numeric(10,2) NOT NULL, "tax" numeric(10,2) NOT NULL, "total_amount" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "clientId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TABLE "addresses"
                                 (
                                   "id"          uuid              NOT NULL DEFAULT uuid_generate_v4(),
                                   "street"      character varying NOT NULL,
                                   "street2"     character varying NOT NULL,
                                   "city"        character varying NOT NULL,
                                   "state"       character varying NOT NULL,
                                   "postal_code" character varying NOT NULL,
                                   "country"     character varying NOT NULL,
                                   "is_default"  boolean           NOT NULL DEFAULT false,
                                   "created_at"  TIMESTAMP         NOT NULL DEFAULT now(),
                                   "updated_at"  TIMESTAMP         NOT NULL DEFAULT now(),
                                   "userId"      uuid              NOT NULL,
                                   CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id")
                                 )`);
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('client', 'support', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'client', "token_version" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "inventories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "available_qty" integer NOT NULL DEFAULT '0', "pending_ship_qty" integer NOT NULL DEFAULT '0', "shipped_qty" integer NOT NULL DEFAULT '0', "processing_qty" integer NOT NULL DEFAULT '0', "low_stock_threshold" integer NOT NULL DEFAULT '5', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "productId" uuid, CONSTRAINT "REL_19f6e91bd3b53e47103305f3f8" UNIQUE ("productId"), CONSTRAINT "PK_7b1946392ffdcb50cfc6ac78c0e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "imageUrl" character varying NOT NULL, "sku" character varying NOT NULL, "weight" numeric(10,2) NOT NULL, "weightUnit" character varying NOT NULL, "nutritionalInfo" jsonb, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_1457f286d91f271313fded23e53" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventories" ADD CONSTRAINT "FK_19f6e91bd3b53e47103305f3f84" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "inventories" DROP CONSTRAINT "FK_19f6e91bd3b53e47103305f3f84"`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_1457f286d91f271313fded23e53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "inventories"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "addresses"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    await queryRunner.query(`DROP TABLE "order_items"`);
  }
}
