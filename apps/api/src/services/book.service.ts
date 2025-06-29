import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookQueryDto } from '../dto/book-query.dto';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) { }

    async create(createBookDto: CreateBookDto): Promise<Book> {
        const book = this.bookRepository.create(createBookDto);
        return await this.bookRepository.save(book);
    }

    async findAll(query: BookQueryDto): Promise<PaginatedResponseDto<Book>> {
        const { search, genre, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC' } = query;

        // Convert string parameters to numbers for pagination
        const pageNum = typeof page === 'string' ? parseInt(page, 10) : page;
        const limitNum = typeof limit === 'string' ? parseInt(limit, 10) : limit;

        const queryBuilder = this.bookRepository.createQueryBuilder('book');

        // Apply search filter - use LIKE with UPPER() for SQLite compatibility
        if (search) {
            queryBuilder.where(
                '(UPPER(book.title) LIKE UPPER(:search) OR UPPER(book.author) LIKE UPPER(:search) OR UPPER(book.description) LIKE UPPER(:search))',
                { search: `%${search}%` }
            );
        }

        // Apply genre filter
        if (genre) {
            if (search) {
                queryBuilder.andWhere('book.genre = :genre', { genre });
            } else {
                queryBuilder.where('book.genre = :genre', { genre });
            }
        }

        // Get total count for pagination
        const total = await queryBuilder.getCount();

        // Apply sorting and pagination
        queryBuilder
            .orderBy(`book.${sortBy}`, sortOrder)
            .skip((pageNum - 1) * limitNum)
            .take(limitNum);

        const books = await queryBuilder.getMany();

        return new PaginatedResponseDto(books, pageNum, limitNum, total);
    }

    async findOne(id: string): Promise<Book> {
        const book = await this.bookRepository.findOne({ where: { id } });
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }

    async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
        const book = await this.findOne(id);
        Object.assign(book, updateBookDto);
        return await this.bookRepository.save(book);
    }

    async remove(id: string): Promise<void> {
        const book = await this.findOne(id);
        await this.bookRepository.remove(book);
    }

    async findByGenre(genre: string): Promise<Book[]> {
        return await this.bookRepository.find({
            where: { genre },
            order: { title: 'ASC' },
        });
    }

    async searchBooks(query: string): Promise<Book[]> {
        return await this.bookRepository
            .createQueryBuilder('book')
            .where('UPPER(book.title) LIKE UPPER(:query) OR UPPER(book.author) LIKE UPPER(:query) OR UPPER(book.description) LIKE UPPER(:query)', {
                query: `%${query}%`,
            })
            .orderBy('book.title', 'ASC')
            .getMany();
    }
} 