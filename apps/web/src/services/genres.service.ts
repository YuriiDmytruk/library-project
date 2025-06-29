'use server'

import { axiosClient } from './axiosClient';
import type { GenreStats } from '../interfaces/genre';

export async function getAllGenres(): Promise<string[]> {
    const response = await axiosClient.get('/genres');
    return response.data;
}

export async function getGenreStats(): Promise<GenreStats[]> {
    const response = await axiosClient.get('/genres/stats');
    return response.data;
}
