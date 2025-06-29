import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from '../config/database.config';
import { seedBooks } from '../../database/seeds/book.seed';

const configService = new ConfigService({
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 5432,
    DB_USERNAME: process.env.DB_USERNAME || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_DATABASE: process.env.DB_DATABASE || 'library_db',
    NODE_ENV: process.env.NODE_ENV || 'development',
});

const dataSource = new DataSource(getDatabaseConfig(configService) as any);

async function seed() {
    try {
        await dataSource.initialize();
        console.log('Database connection established');

        // Run seeds
        await seedBooks(dataSource);

        console.log('All seeds completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
}

seed(); 