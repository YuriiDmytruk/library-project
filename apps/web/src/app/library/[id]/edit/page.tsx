"use client";
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import {
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Box,
    Paper,
    Alert,
    CircularProgress,
    FormControlLabel,
    Switch
} from '@mui/material';
import { ArrowBack, Save } from '@mui/icons-material';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../store';
import { fetchBook, updateBook } from '../../../../store/booksSlice';
import type { Book } from '@/interfaces/books';

interface BookFormData {
    title: string;
    author: string;
    description: string;
    genre: string;
    publicationYear: string;
    isbn: string;
    pages: string;
    imageUrl: string;
}

interface EditBookPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function EditBookPage({ params }: EditBookPageProps) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { book, genres, loading, error } = useSelector((state: RootState) => state.books);

    const { id } = use(params);

    const [formData, setFormData] = useState<BookFormData>({
        title: '',
        author: '',
        description: '',
        genre: '',
        publicationYear: '',
        isbn: '',
        pages: '',
        imageUrl: ''
    });

    const [useCustomGenre, setUseCustomGenre] = useState(false);

    useEffect(() => {
        dispatch(fetchBook(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title || '',
                author: book.author || '',
                description: book.description || '',
                genre: book.genre || '',
                publicationYear: book.publicationYear?.toString() || '',
                isbn: book.isbn || '',
                pages: book.pages?.toString() || '',
                imageUrl: book.imageUrl || ''
            });

            setUseCustomGenre(!genres.includes(book.genre || ''));
        }
    }, [book, genres]);

    const handleInputChange = (field: keyof BookFormData) => (
        event: React.ChangeEvent<HTMLInputElement> | { target: { value: unknown } }
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value as string
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!book) return;

        try {
            const bookData: Partial<Book> = {
                title: formData.title,
                author: formData.author,
                description: formData.description,
                genre: formData.genre,
                publicationYear: formData.publicationYear ? parseInt(formData.publicationYear) : undefined,
                isbn: formData.isbn || undefined,
                pages: formData.pages ? parseInt(formData.pages) : undefined,
                imageUrl: formData.imageUrl || undefined
            };

            await dispatch(updateBook({ id: book.id, data: bookData })).unwrap();
            router.push(`/library/${book.id}`);
        } catch (error) {
            console.error('Failed to update book:', error);
        }
    };

    if (loading && !book) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!book) {
        return (
            <Alert severity="error">
                Book not found
            </Alert>
        );
    }

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Button
                    component={Link}
                    href={`/library/${book.id}`}
                    startIcon={<ArrowBack />}
                    variant="text"
                >
                    Back to Book Details
                </Button>
            </Box>

            <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Edit Book
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Title"
                        value={formData.title}
                        onChange={handleInputChange('title')}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Author"
                        value={formData.author}
                        onChange={handleInputChange('author')}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Description"
                        value={formData.description}
                        onChange={handleInputChange('description')}
                        multiline
                        rows={4}
                        fullWidth
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={useCustomGenre}
                                    onChange={(e) => setUseCustomGenre(e.target.checked)}
                                />
                            }
                            label="Use custom genre"
                        />

                        {useCustomGenre ? (
                            <TextField
                                label="Custom Genre"
                                value={formData.genre}
                                onChange={handleInputChange('genre')}
                                required
                                fullWidth
                                placeholder="Enter your custom genre"
                            />
                        ) : (
                            <FormControl fullWidth required>
                                <InputLabel>Genre</InputLabel>
                                <Select
                                    value={formData.genre}
                                    label="Genre"
                                    onChange={handleInputChange('genre')}
                                >
                                    {genres.map((genre) => (
                                        <MenuItem key={genre} value={genre}>
                                            {genre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </Box>

                    <TextField
                        label="Publication Year"
                        value={formData.publicationYear}
                        onChange={handleInputChange('publicationYear')}
                        type="number"
                        fullWidth
                    />

                    <TextField
                        label="ISBN"
                        value={formData.isbn}
                        onChange={handleInputChange('isbn')}
                        fullWidth
                    />

                    <TextField
                        label="Pages"
                        value={formData.pages}
                        onChange={handleInputChange('pages')}
                        type="number"
                        fullWidth
                    />

                    <TextField
                        label="Image URL"
                        value={formData.imageUrl}
                        onChange={handleInputChange('imageUrl')}
                        fullWidth
                    />

                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<Save />}
                            disabled={loading}
                            sx={{ minWidth: 120 }}
                        >
                            {loading ? <CircularProgress size={20} /> : 'Update Book'}
                        </Button>
                        <Button
                            component={Link}
                            href={`/library/${book.id}`}
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
} 