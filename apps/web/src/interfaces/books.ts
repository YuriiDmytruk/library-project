export interface Book {
    id: string;
    title: string;
    author: string;
    description?: string;
    imageUrl?: string;
    isbn?: string;
    publicationYear?: number;
    genre?: string;
    pages?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface BookQueryParams {
    search?: string;
    genre?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}