// Export all service functions
export {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from './books.service';

export {
    getAllGenres,
    getGenreStats
} from './genres.service';

export { axiosClient } from './axiosClient'; 