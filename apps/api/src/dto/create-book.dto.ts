import { IsString, IsOptional, IsNumber, IsUrl, Min, Max } from 'class-validator';

export class CreateBookDto {
    @IsString()
    title: string;

    @IsString()
    author: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUrl()
    imageUrl?: string;

    @IsOptional()
    @IsString()
    isbn?: string;

    @IsOptional()
    @IsNumber()
    @Min(1000)
    @Max(new Date().getFullYear())
    publicationYear?: number;

    @IsOptional()
    @IsString()
    genre?: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    pages?: number;
} 