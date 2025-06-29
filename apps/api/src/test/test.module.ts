import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from '../modules/book.module';
import { getTestDatabaseConfig } from '../config/database-test.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(getTestDatabaseConfig()),
        BookModule,
    ],
})
export class TestModule { } 