import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
    reducer: {
        books: booksReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 