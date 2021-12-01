import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
};
