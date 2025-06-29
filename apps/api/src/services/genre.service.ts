import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
import { Book } from '../entities/book.entity';

@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) { }

    async getAllGenres(): Promise<string[]> {
        const books = await this.bookRepository.find({
            select: ['genre'],
            where: { genre: Not(IsNull()) },
        });

        const genres = books
            .map(book => book.genre)
            .filter((genre, index, self) => genre && self.indexOf(genre) === index)
            .sort();

        return genres;
    }

    async getGenreStats(): Promise<{ genre: string; count: number }[]> {
        const result = await this.bookRepository
            .createQueryBuilder('book')
            .select('book.genre', 'genre')
            .addSelect('COUNT(*)', 'count')
            .where('book.genre IS NOT NULL')
            .groupBy('book.genre')
            .orderBy('count', 'DESC')
            .getRawMany();

        return result.map(item => ({
            genre: item.genre,
            count: parseInt(item.count),
        }));
    }
} 