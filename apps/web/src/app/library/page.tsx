"use client";
import { useEffect, useState } from "react";
import {
    Typography,
    TextField,
    FormControl,
    Select,
    MenuItem,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    CircularProgress,
    TablePagination,
    InputLabel,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    IconButton,
    Tooltip
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import type { Book } from "@/interfaces/books";
import { fetchBooks, fetchGenres, deleteBook } from "../../store/booksSlice";
import { setSearch, setGenre, setPage, setLimit } from "../../store/uiSlice";
import useDebounce from "../../hooks/useDebounce";

export default function LibraryPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { books, loading, error, total } = useSelector((state: RootState) => state.books);
    const { genres } = useSelector((state: RootState) => state.books);
    const { search, genre, page, limit } = useSelector((state: RootState) => state.ui);

    const debouncedSearch = useDebounce(search, 500);

    // Delete confirmation dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

    useEffect(() => {
        dispatch(fetchGenres());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchBooks({ search: debouncedSearch, genre, page, limit }));
    }, [dispatch, debouncedSearch, genre, page, limit]);

    const handlePageChange = (event: unknown, newPage: number) => {
        dispatch(setPage(newPage + 1));
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLimit(parseInt(event.target.value, 10)));
    };

    const handleDeleteClick = (book: Book) => {
        setBookToDelete(book);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (bookToDelete) {
            try {
                await dispatch(deleteBook(bookToDelete.id)).unwrap();
                // Refresh the books list
                dispatch(fetchBooks({ search: debouncedSearch, genre, page, limit }));
            } catch (error) {
                console.error('Failed to delete book:', error);
            }
        }
        setDeleteDialogOpen(false);
        setBookToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setBookToDelete(null);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Library
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    component={Link}
                    href="/library/add"
                >
                    Add Book
                </Button>
            </Box>

            <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                    label="Search by title, author, or description"
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                    sx={{ minWidth: 240 }}
                    size="small"
                />
                <FormControl sx={{ minWidth: 180 }} size="small">
                    <InputLabel>Filter by genre</InputLabel>
                    <Select
                        value={genre || ''}
                        label="Filter by genre"
                        onChange={(e) => dispatch(setGenre(e.target.value))}
                    >
                        <MenuItem value="">
                            <em>All genres</em>
                        </MenuItem>
                        {genres.map((g: string) => (
                            <MenuItem key={g} value={g}>{g}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>Genre</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map((book: Book) => (
                                <TableRow key={book.id} hover>
                                    <TableCell>
                                        <Link href={`/library/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {book.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.genre}</TableCell>
                                    <TableCell>{book.publicationYear}</TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    component={Link}
                                                    href={`/library/${book.id}/edit`}
                                                    size="small"
                                                    color="primary"
                                                >
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleDeleteClick(book)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={total}
                        page={page - 1}
                        onPageChange={handlePageChange}
                        rowsPerPage={limit}
                        onRowsPerPageChange={handleRowsPerPageChange}
                        rowsPerPageOptions={[5, 10, 20, 50]}
                    />
                </TableContainer>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">
                    Delete Book
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete "{bookToDelete?.title}"? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
} 