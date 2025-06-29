import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';

export const getTestDatabaseConfig = (): TypeOrmModuleOptions => ({
    type: 'better-sqlite3',
    database: ':memory:',
    entities: [Book],
    synchronize: true,
    logging: false,
}); 