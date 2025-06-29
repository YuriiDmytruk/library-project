"use client";
import { useState } from 'react';
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
import type { RootState, AppDispatch } from '../../../store';
import { createBook } from '../../../store/booksSlice';
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

export default function AddBookPage() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { genres, loading, error } = useSelector((state: RootState) => state.books);

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

        try {
            const bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'> = {
                title: formData.title,
                author: formData.author,
                description: formData.description,
                genre: formData.genre,
                publicationYear: formData.publicationYear ? parseInt(formData.publicationYear) : undefined,
                isbn: formData.isbn || undefined,
                pages: formData.pages ? parseInt(formData.pages) : undefined,
                imageUrl: formData.imageUrl || undefined
            };

            await dispatch(createBook(bookData)).unwrap();
            router.push('/library');
        } catch (error) {
            console.error('Failed to create book:', error);
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Button
                    component={Link}
                    href="/library"
                    startIcon={<ArrowBack />}
                    variant="text"
                >
                    Back to Library
                </Button>
            </Box>

            <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add New Book
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
                            {loading ? <CircularProgress size={20} /> : 'Save Book'}
                        </Button>
                        <Button
                            component={Link}
                            href="/library"
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