import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
    search: string;
    genre: string;
    page: number;
    limit: number;
}

const initialState: UIState = {
    search: '',
    genre: '',
    page: 1,
    limit: 10,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
            state.page = 1;
        },
        setGenre(state, action: PayloadAction<string>) {
            state.genre = action.payload;
            state.page = 1;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
            state.page = 1;
        },
        resetFilters(state) {
            state.search = '';
            state.genre = '';
            state.page = 1;
            state.limit = 10;
        },
    },
});

export const { setSearch, setGenre, setPage, setLimit, resetFilters } = uiSlice.actions;
export default uiSlice.reducer; 