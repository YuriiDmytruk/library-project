"use client";
import { useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Alert,
    CircularProgress,
    Avatar,
    Divider,
    Chip
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store';
import type { Book } from '@/interfaces/books';
import { fetchBook } from '../../../store/booksSlice';

interface BookDetailsClientProps {
    initialBook: Book;
}

export default function BookDetailsClient({ initialBook }: BookDetailsClientProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { book, loading, error } = useSelector((state: RootState) => state.books);

    const currentBook = book || initialBook;

    useEffect(() => {
        dispatch(fetchBook(initialBook.id));
    }, [dispatch, initialBook.id]);

    if (loading && !currentBook) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error && !currentBook) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Card>
            <CardContent>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                    <Box sx={{ flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                        {currentBook.imageUrl ? (
                            <Avatar
                                src={currentBook.imageUrl}
                                alt={currentBook.title}
                                variant="rounded"
                                sx={{ width: 200, height: 300 }}
                            />
                        ) : (
                            <Avatar
                                variant="rounded"
                                sx={{
                                    width: 200,
                                    height: 300,
                                    bgcolor: 'grey.300',
                                    fontSize: '2rem'
                                }}
                            >
                                📚
                            </Avatar>
                        )}
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h3" component="h1" gutterBottom>
                            {currentBook.title}
                        </Typography>
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                            by {currentBook.author}
                        </Typography>

                        {currentBook.description && (
                            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                                {currentBook.description}
                            </Typography>
                        )}

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Author
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {currentBook.author}
                                </Typography>
                            </Box>

                            {currentBook.genre && (
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Genre
                                    </Typography>
                                    <Chip label={currentBook.genre} color="primary" size="small" />
                                </Box>
                            )}

                            {currentBook.publicationYear && (
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Publication Year
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {currentBook.publicationYear}
                                    </Typography>
                                </Box>
                            )}

                            {currentBook.isbn && (
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        ISBN
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {currentBook.isbn}
                                    </Typography>
                                </Box>
                            )}

                            {currentBook.pages && (
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Pages
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {currentBook.pages}
                                    </Typography>
                                </Box>
                            )}

                            {currentBook.createdAt && (
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Added
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {new Date(currentBook.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
} 