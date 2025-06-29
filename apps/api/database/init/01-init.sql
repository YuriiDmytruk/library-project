-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create books table if it doesn't exist
CREATE TABLE IF NOT EXISTS books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    imageUrl VARCHAR(255),
    isbn VARCHAR(50),
    publicationYear INTEGER,
    genre VARCHAR(100),
    pages INTEGER DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on title and author for better search performance
CREATE INDEX IF NOT EXISTS idx_books_title_author ON books(title, author);
CREATE INDEX IF NOT EXISTS idx_books_genre ON books(genre); 