import { DataSource } from 'typeorm';
import { Book } from '../../src/entities/book.entity';

export const seedBooks = async (dataSource: DataSource): Promise<void> => {
    const bookRepository = dataSource.getRepository(Book);

    const books = [
        {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
            imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
            isbn: '978-0743273565',
            publicationYear: 1925,
            genre: 'Classic',
            pages: 180,
        },
        {
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            description: 'The story of young Scout Finch and her father Atticus in a racially divided Alabama town.',
            imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
            isbn: '978-0446310789',
            publicationYear: 1960,
            genre: 'Classic',
            pages: 281,
        },
        {
            title: '1984',
            author: 'George Orwell',
            description: 'A dystopian novel about totalitarianism and surveillance society.',
            imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
            isbn: '978-0451524935',
            publicationYear: 1949,
            genre: 'Dystopian',
            pages: 328,
        },
        {
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            description: 'The story of Elizabeth Bennet and Mr. Darcy in early 19th century England.',
            imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop',
            isbn: '978-0141439518',
            publicationYear: 1813,
            genre: 'Romance',
            pages: 432,
        },
        {
            title: 'The Hobbit',
            author: 'J.R.R. Tolkien',
            description: 'The adventure of Bilbo Baggins, a hobbit who embarks on a quest with thirteen dwarves.',
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
            isbn: '978-0547928241',
            publicationYear: 1937,
            genre: 'Fantasy',
            pages: 366,
        },
        {
            title: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
            description: 'The story of Holden Caulfield, a teenager navigating the complexities of growing up.',
            imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
            isbn: '978-0316769488',
            publicationYear: 1951,
            genre: 'Coming-of-age',
            pages: 277,
        },
        {
            title: 'Lord of the Flies',
            author: 'William Golding',
            description: 'A group of British boys stranded on an uninhabited island and their attempt to govern themselves.',
            imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
            isbn: '978-0399501487',
            publicationYear: 1954,
            genre: 'Allegory',
            pages: 224,
        },
        {
            title: 'Animal Farm',
            author: 'George Orwell',
            description: 'An allegorical novella about a group of farm animals who rebel against their human farmer.',
            imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
            isbn: '978-0451526342',
            publicationYear: 1945,
            genre: 'Allegory',
            pages: 112,
        },
    ];

    for (const bookData of books) {
        const existingBook = await bookRepository.findOne({
            where: { title: bookData.title, author: bookData.author },
        });

        if (!existingBook) {
            const book = bookRepository.create(bookData);
            await bookRepository.save(book);
            console.log(`Seeded book: ${bookData.title}`);
        }
    }

    console.log('Books seeding completed!');
}; 