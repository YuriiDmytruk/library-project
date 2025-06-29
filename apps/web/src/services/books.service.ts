'use server'

import { axiosClient } from './axiosClient';
import type { Book, BookQueryParams } from '../interfaces/books';
import { PaginatedResponse } from '@/interfaces/pagination';

export async function getAllBooks(params: BookQueryParams = {}): Promise<PaginatedResponse<Book>> {
    const response = await axiosClient.get('/books', { params });
    return response.data;
}

export async function getBookById(id: string): Promise<Book> {
    const response = await axiosClient.get(`/books/${id}`);
    return response.data;
}

export async function createBook(book: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>): Promise<Book> {
    const response = await axiosClient.post('/books', book);
    return response.data;
}

export async function updateBook(id: string, book: Partial<Book>): Promise<Book> {
    const response = await axiosClient.patch(`/books/${id}`, book);
    return response.data;
}

export async function deleteBook(id: string): Promise<void> {
    await axiosClient.delete(`/books/${id}`);
}
