import { Typography, Button, Card, CardContent, Box } from '@mui/material';
import Link from 'next/link';
import { Book, Search, Favorite } from '@mui/icons-material';

export default function HomePage() {
  return (
    <Box sx={{ textAlign: 'center', py: 5 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Online Library
      </Typography>

      <Typography variant="h5" color="text.secondary" sx={{ mb: 5, maxWidth: 600, mx: 'auto' }}>
        Discover thousands of books across various genres. Search, filter, and explore our extensive collection of literature.
      </Typography>

      <Box sx={{ mb: 8 }}>
        <Button
          variant="contained"
          size="large"
          component={Link}
          href="/library"
          startIcon={<Search />}
          sx={{ px: 4, py: 1.5 }}
        >
          Browse Library
        </Button>
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
        gap: 4,
        maxWidth: 800,
        mx: 'auto'
      }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Book sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h3" gutterBottom>
              Extensive Collection
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Access a vast library of books across multiple genres and categories.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Search sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h3" gutterBottom>
              Easy Search
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Find exactly what you're looking for with our powerful search and filter tools.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Favorite sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h3" gutterBottom>
              Curated Content
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Carefully selected books to ensure quality and relevance for all readers.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
