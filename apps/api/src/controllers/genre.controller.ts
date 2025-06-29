import { Controller, Get } from '@nestjs/common';
import { GenreService } from '../services/genre.service';

@Controller('genres')
export class GenreController {
    constructor(private readonly genreService: GenreService) { }

    @Get()
    getAllGenres(): Promise<string[]> {
        return this.genreService.getAllGenres();
    }

    @Get('stats')
    getGenreStats(): Promise<{ genre: string; count: number }[]> {
        return this.genreService.getGenreStats();
    }
} 