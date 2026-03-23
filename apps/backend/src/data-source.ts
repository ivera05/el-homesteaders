import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const isProduction = process.env.NODE_ENV === 'production';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'elh_user',
  password: process.env.DB_PASSWORD ?? 'elh_password',
  database: process.env.DB_NAME ?? 'elh',
  entities: [
    isProduction ? 'dist/modules/**/*.entity.js' : 'src/modules/**/*.entity.ts',
  ],
  migrations: [isProduction ? 'dist/migrations/*.js' : 'src/migrations/*.ts'],
  synchronize: false,
  logging: false,
});
