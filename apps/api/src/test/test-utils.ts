import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestModule } from './test.module';
import { Book } from '../entities/book.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

export const createTestApp = async (): Promise<INestApplication> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [TestModule],
    }).compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    return app;
};

export const getBookRepository = (app: INestApplication): Repository<Book> => {
    return app.get<Repository<Book>>(getRepositoryToken(Book));
};

export const createTestBook = (overrides: Partial<Book> = {}): Partial<Book> => ({
    title: 'Test Book',
    author: 'Test Author',
    description: 'A test book description',
    imageUrl: 'https://example.com/test-image.jpg',
    isbn: '978-1234567890',
    publicationYear: 2024,
    genre: 'Test Genre',
    pages: 200,
    ...overrides,
});

export const seedTestBooks = async (app: INestApplication): Promise<Book[]> => {
    const bookRepository = getBookRepository(app);

    const testBooks = [
        createTestBook({ title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic' }),
        createTestBook({ title: '1984', author: 'George Orwell', genre: 'Dystopian' }),
        createTestBook({ title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance' }),
    ];

    const savedBooks: Book[] = [];
    for (const bookData of testBooks) {
        const book = bookRepository.create(bookData);
        savedBooks.push(await bookRepository.save(book));
    }

    return savedBooks;
}; 