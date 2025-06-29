import { Suspense } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBookById } from '../../../services';
import BookDetailsClient from './BookDetailsClient';

interface BookDetailsPageProps {
    params: {
        id: string;
    };
}

export default async function BookDetailsPage({ params }: BookDetailsPageProps) {
    let book;
    try {
        book = await getBookById(params.id);
    } catch (error) {
        console.error('Failed to fetch book:', error);
        notFound();
    }

    if (!book) {
        notFound();
    }

    return (
        <Box>
            <Box sx={{ mb: 2 }}>
                <Button
                    component={Link}
                    href="/library"
                    variant="text"
                    startIcon={<ArrowBack />}
                >
                    Back to Library
                </Button>
            </Box>

            <Suspense fallback={
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                </Box>
            }>
                <BookDetailsClient initialBook={book} />
            </Suspense>
        </Box>
    );
} 