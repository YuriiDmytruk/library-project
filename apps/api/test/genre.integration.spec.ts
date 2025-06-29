import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, seedTestBooks, getBookRepository } from '../src/test/test-utils';

describe('GenreController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await createTestApp();
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        // Clear database and seed test data before each test
        const bookRepository = getBookRepository(app);
        await bookRepository.clear();
        await seedTestBooks(app);
    });

    describe('/genres (GET)', () => {
        it('should return all unique genres', async () => {
            const response = await request(app.getHttpServer())
                .get('/genres')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toContain('Classic');
            expect(response.body).toContain('Dystopian');
            expect(response.body).toContain('Romance');
            expect(response.body.length).toBe(3);
        });

        it('should return genres in alphabetical order', async () => {
            const response = await request(app.getHttpServer())
                .get('/genres')
                .expect(200);

            const genres = response.body;
            expect(genres).toEqual(['Classic', 'Dystopian', 'Romance']);
        });
    });

    describe('/genres/stats (GET)', () => {
        it('should return genre statistics with book counts', async () => {
            const response = await request(app.getHttpServer())
                .get('/genres/stats')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);

            const stats = response.body;
            expect(stats).toHaveLength(3);

            // Check that each genre has the correct structure
            stats.forEach((stat: any) => {
                expect(stat).toHaveProperty('genre');
                expect(stat).toHaveProperty('count');
                expect(typeof stat.genre).toBe('string');
                expect(typeof stat.count).toBe('number');
            });

            // Check specific genres
            const classicStat = stats.find((stat: any) => stat.genre === 'Classic');
            const dystopianStat = stats.find((stat: any) => stat.genre === 'Dystopian');
            const romanceStat = stats.find((stat: any) => stat.genre === 'Romance');

            expect(classicStat.count).toBe(1);
            expect(dystopianStat.count).toBe(1);
            expect(romanceStat.count).toBe(1);
        });

        it('should return stats ordered by count descending', async () => {
            // Add more books to test ordering
            const bookRepository = getBookRepository(app);
            await bookRepository.save([
                bookRepository.create({
                    title: 'Another Classic Book',
                    author: 'Another Author',
                    genre: 'Classic',
                }),
                bookRepository.create({
                    title: 'Yet Another Classic',
                    author: 'Yet Another Author',
                    genre: 'Classic',
                }),
            ]);

            const response = await request(app.getHttpServer())
                .get('/genres/stats')
                .expect(200);

            const stats = response.body;
            expect(stats[0].genre).toBe('Classic');
            expect(stats[0].count).toBe(3); // 3 Classic books now
        });
    });
}); 