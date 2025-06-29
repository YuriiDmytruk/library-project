import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, seedTestBooks, createTestBook, getBookRepository } from '../src/test/test-utils';
import { Book } from '../src/entities/book.entity';

describe('BookController (e2e)', () => {
    let app: INestApplication;
    let testBooks: Book[];

    beforeAll(async () => {
        app = await createTestApp();
        testBooks = await seedTestBooks(app);
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        // Clear database before each test
        const bookRepository = getBookRepository(app);
        await bookRepository.clear();
        testBooks = await seedTestBooks(app);
    });

    describe('/books (GET)', () => {
        it('should return all books with pagination', async () => {
            const response = await request(app.getHttpServer())
                .get('/books')
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body).toHaveProperty('meta');
            expect(response.body.data).toHaveLength(3);
            expect(response.body.meta.total).toBe(3);
            expect(response.body.meta.page).toBe(1);
            expect(response.body.meta.limit).toBe(10);
        });

        it('should filter books by genre', async () => {
            const response = await request(app.getHttpServer())
                .get('/books?genre=Classic')
                .expect(200);

            expect(response.body.data).toHaveLength(1);
            expect(response.body.data[0].genre).toBe('Classic');
        });

        it('should search books by title', async () => {
            const response = await request(app.getHttpServer())
                .get('/books?search=gatsby')
                .expect(200);

            expect(response.body.data).toHaveLength(1);
            expect(response.body.data[0].title).toContain('Gatsby');
        });

        it('should search books by author', async () => {
            const response = await request(app.getHttpServer())
                .get('/books?search=orwell')
                .expect(200);

            expect(response.body.data).toHaveLength(1);
            expect(response.body.data[0].author).toContain('Orwell');
        });

        it('should handle pagination correctly', async () => {
            const response = await request(app.getHttpServer())
                .get('/books?page=1&limit=2')
                .expect(200);

            expect(response.body.data).toHaveLength(2);
            expect(response.body.meta.page).toBe(1);
            expect(response.body.meta.limit).toBe(2);
            expect(response.body.meta.total).toBe(3);
            expect(response.body.meta.hasNext).toBe(true);
        });

        it('should sort books by title', async () => {
            const response = await request(app.getHttpServer())
                .get('/books?sortBy=title&sortOrder=ASC')
                .expect(200);

            const titles = response.body.data.map((book: Book) => book.title);
            expect(titles).toEqual(['1984', 'Pride and Prejudice', 'The Great Gatsby']);
        });
    });

    describe('/books/:id (GET)', () => {
        it('should return a specific book', async () => {
            const bookId = testBooks[0].id;
            const response = await request(app.getHttpServer())
                .get(`/books/${bookId}`)
                .expect(200);

            expect(response.body.id).toBe(bookId);
            expect(response.body.title).toBe(testBooks[0].title);
        });

        it('should return 404 for non-existent book', async () => {
            await request(app.getHttpServer())
                .get('/books/non-existent-id')
                .expect(404);
        });
    });

    describe('/books (POST)', () => {
        it('should create a new book', async () => {
            const newBook = createTestBook({
                title: 'New Test Book',
                author: 'New Test Author',
            });

            const response = await request(app.getHttpServer())
                .post('/books')
                .send(newBook)
                .expect(201);

            expect(response.body.title).toBe(newBook.title);
            expect(response.body.author).toBe(newBook.author);
            expect(response.body.id).toBeDefined();
        });

        it('should validate required fields', async () => {
            const invalidBook = { description: 'Missing title and author' };

            const response = await request(app.getHttpServer())
                .post('/books')
                .send(invalidBook)
                .expect(400);

            expect(response.body.message).toContain('title must be a string');
            expect(response.body.message).toContain('author must be a string');
        });

        it('should validate URL format for imageUrl', async () => {
            const invalidBook = createTestBook({
                title: 'Test Book',
                author: 'Test Author',
                imageUrl: 'invalid-url',
            });

            const response = await request(app.getHttpServer())
                .post('/books')
                .send(invalidBook)
                .expect(400);

            expect(response.body.message).toContain('imageUrl must be a URL address');
        });
    });

    describe('/books/:id (PATCH)', () => {
        it('should update a book', async () => {
            const bookId = testBooks[0].id;
            const updateData = { title: 'Updated Title', genre: 'Updated Genre' };

            const response = await request(app.getHttpServer())
                .patch(`/books/${bookId}`)
                .send(updateData)
                .expect(200);

            expect(response.body.title).toBe(updateData.title);
            expect(response.body.genre).toBe(updateData.genre);
            expect(response.body.id).toBe(bookId);
        });

        it('should return 404 for non-existent book', async () => {
            await request(app.getHttpServer())
                .patch('/books/non-existent-id')
                .send({ title: 'Updated Title' })
                .expect(404);
        });
    });

    describe('/books/:id (DELETE)', () => {
        it('should delete a book', async () => {
            const bookId = testBooks[0].id;

            await request(app.getHttpServer())
                .delete(`/books/${bookId}`)
                .expect(200);

            // Verify book is deleted
            await request(app.getHttpServer())
                .get(`/books/${bookId}`)
                .expect(404);
        });

        it('should return 404 for non-existent book', async () => {
            await request(app.getHttpServer())
                .delete('/books/non-existent-id')
                .expect(404);
        });
    });
}); 