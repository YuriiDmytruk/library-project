import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from '../controllers/book.controller';
import { GenreController } from '../controllers/genre.controller';
import { BookService } from '../services/book.service';
import { GenreService } from '../services/genre.service';
import { Book } from '../entities/book.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    controllers: [BookController, GenreController],
    providers: [BookService, GenreService],
    exports: [BookService, GenreService],
})
export class BookModule { } 