import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ValidationPipe,
    UsePipes,
} from '@nestjs/common';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookQueryDto } from '../dto/book-query.dto';
import { Book } from '../entities/book.entity';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.bookService.create(createBookDto);
    }

    @Get()
    findAll(@Query() query: BookQueryDto): Promise<PaginatedResponseDto<Book>> {
        return this.bookService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Book> {
        return this.bookService.findOne(id);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
        return this.bookService.update(id, updateBookDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.bookService.remove(id);
    }
} 