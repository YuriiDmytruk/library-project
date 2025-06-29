import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllBooks, getBookById, getAllGenres, deleteBook as deleteBookService, createBook as createBookService, updateBook as updateBookService } from '../services';
import { Book, BookQueryParams } from '@/interfaces/books';

export interface BooksState {
    books: Book[];
    book: Book | null;
    genres: string[];
    loading: boolean;
    error: string | null;
    total: number;
}

const initialState: BooksState = {
    books: [],
    book: null,
    genres: [],
    loading: false,
    error: null,
    total: 0,
};

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (params: BookQueryParams, { rejectWithValue }) => {
        try {
            const response = await getAllBooks(params);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch books');
        }
    }
);

export const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async (id: string, { rejectWithValue }) => {
        try {
            const book = await getBookById(id);
            return book;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch book');
        }
    }
);

export const fetchGenres = createAsyncThunk(
    'books/fetchGenres',
    async (_, { rejectWithValue }) => {
        try {
            const genres = await getAllGenres();
            return genres;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch genres');
        }
    }
);

export const createBook = createAsyncThunk(
    'books/createBook',
    async (bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
        try {
            const book = await createBookService(bookData);
            return book;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to create book');
        }
    }
);

export const updateBook = createAsyncThunk(
    'books/updateBook',
    async ({ id, data }: { id: string; data: Partial<Book> }, { rejectWithValue }) => {
        try {
            const book = await updateBookService(id, data);
            return book;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to update book');
        }
    }
);

export const deleteBook = createAsyncThunk(
    'books/deleteBook',
    async (id: string, { rejectWithValue }) => {
        try {
            await deleteBookService(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to delete book');
        }
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload.data;
                state.total = action.payload.meta?.total || 0;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchBook.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.book = null;
            })
            .addCase(fetchBook.fulfilled, (state, action) => {
                state.loading = false;
                state.book = action.payload;
            })
            .addCase(fetchBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchGenres.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.loading = false;
                state.genres = action.payload;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books.unshift(action.payload);
                state.total += 1;
            })
            .addCase(createBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.books.findIndex(book => book.id === action.payload.id);
                if (index !== -1) {
                    state.books[index] = action.payload;
                }
                if (state.book && state.book.id === action.payload.id) {
                    state.book = action.payload;
                }
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books = state.books.filter(book => book.id !== action.payload);
                state.total = Math.max(0, state.total - 1);
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default booksSlice.reducer; 