import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dba',
  password: 'dba',
  database: 'livrariaDb',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/entities/*.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  subscribers: [__dirname + '/subscribers/*.{ts,js}'],
});