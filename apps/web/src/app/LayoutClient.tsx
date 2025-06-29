"use client";
import { AppBar, Toolbar, Typography, Container, ThemeProvider, createTheme, Button, Box } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Link from "next/link";
import Providers from "./providers";

// Create emotion cache
const cache = createCache({
    key: 'mui',
    prepend: true,
});

// Create a theme instance
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

interface LayoutClientProps {
    children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
                                Online Library
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                                <Button color="inherit" component={Link} href="/">
                                    Home
                                </Button>
                                <Button color="inherit" component={Link} href="/library">
                                    Library
                                </Button>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <Container maxWidth="lg" sx={{ py: 3, flex: 1 }}>
                        <Providers>{children}</Providers>
                    </Container>
                </Box>
            </ThemeProvider>
        </CacheProvider>
    );
} 