# 📚 Online Library - Monorepo Project

A modern online library application built with Next.js frontend, NestJS backend, PostgreSQL database, and managed with Turborepo.

## ⚡ Fast Start (Quick Setup)

Want to get up and running in 5 minutes? Follow these quick commands:

```bash
# 1. Clone and install
git clone <repository-url>
cd library-project
yarn install

# 2. Start database with Docker
docker-compose up -d

# 3. Setup environment files
# Create apps/api/.env with:
echo "DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=library_db
PORT=3001
NODE_ENV=development" > apps/api/.env

# Create apps/web/.env.local with:
echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api" > apps/web/.env.local

# 4. Setup database and seed data
cd apps/api
yarn migration:run
yarn seed:run
cd ../..

# 5. Start everything with Turborepo
yarn dev
```

🎉 **That's it!** Your application should now be running at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Database**: PostgreSQL on localhost:5432

---

## 🏗️ Architecture

- **Frontend**: Next.js 15 with Material-UI, Redux Toolkit, TypeScript
- **Backend**: NestJS with TypeORM, PostgreSQL
- **Database**: PostgreSQL with Docker support
- **Build Tool**: Turborepo for monorepo management
- **Package Manager**: Yarn Workspaces

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Yarn package manager
- Docker and Docker Compose
- PostgreSQL (or use Docker)

### 1. Clone and Install

```bash
git clone <repository-url>
cd library-project
yarn install
```

### 2. Environment Setup

Create environment files for both frontend and backend:

#### Backend Environment (`.env` in `apps/api/`)

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=library_db

# Application Configuration
PORT=3001
NODE_ENV=development
```

#### Frontend Environment (`.env.local` in `apps/web/`)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Optional: Environment
NEXT_PUBLIC_ENV=development
```

### 3. Database Setup

#### Option A: Using Docker (Recommended)

```bash
# Start PostgreSQL with Docker
docker-compose up -d

# The database will be available at:
# Host: localhost
# Port: 5432
# Username: postgres
# Password: password
# Database: library_db
```

#### Option B: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database named `library_db`
3. Update the `.env` file with your local credentials

### 4. Database Migrations and Seeding

```bash
# Navigate to API directory
cd apps/api

# Run database migrations
yarn migration:run

# Seed the database with sample data
yarn seed:run
```

### 5. Start Development Servers

#### Start Backend (API)

```bash
# From the API directory
cd apps/api
yarn start:dev

# Or from root with Turborepo
yarn dev:api
```

#### Start Frontend (Web)

```bash
# From the Web directory
cd apps/web
yarn dev

# Or from root with Turborepo
yarn dev:web
```

#### Start Both (Recommended)

```bash
# From root directory
yarn dev
```

## 🔧 Available Scripts

### Root Level (Turborepo)

```bash
# Development
yarn dev              # Start both frontend and backend
yarn dev:api          # Start only backend
yarn dev:web          # Start only frontend

# Build
yarn build            # Build all applications
yarn build:api        # Build only backend
yarn build:web        # Build only frontend

# Testing
yarn test             # Run all tests
yarn test:api         # Run backend tests
yarn test:web         # Run frontend tests

# Linting
yarn lint             # Lint all code
yarn lint:fix         # Fix linting issues
```

### Backend (API)

```bash
# Development
yarn start:dev        # Start development server
yarn start:debug      # Start with debug mode
yarn start:prod       # Start production server

# Database
yarn migration:generate    # Generate new migration
yarn migration:run         # Run pending migrations
yarn migration:revert      # Revert last migration
yarn seed:run             # Run database seeds

# Testing
yarn test                 # Run tests
yarn test:e2e            # Run end-to-end tests
yarn test:cov            # Run tests with coverage
```

### Frontend (Web)

```bash
# Development
yarn dev              # Start development server
yarn build            # Build for production
yarn start            # Start production server

# Linting
yarn lint             # Run ESLint
yarn lint:fix         # Fix ESLint issues
```

## 🌐 API Endpoints

### Books
- `GET /api/books` - Get all books (with pagination, search, filters)
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Genres
- `GET /api/genres` - Get all genres
- `GET /api/genres/stats` - Get genre statistics

### Query Parameters
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search in title, author, description
- `genre` - Filter by genre

## 🎨 Frontend Features

### Pages
- **Home** (`/`) - Welcome page with library overview
- **Library** (`/library`) - Book listing with search and filters
- **Book Details** (`/library/:id`) - Individual book information
- **Add Book** (`/library/add`) - Add new book form
- **Edit Book** (`/library/:id/edit`) - Edit existing book

### Features
- ✅ **Search & Filter** - Search books by title/author, filter by genre
- ✅ **Pagination** - Navigate through large book collections
- ✅ **CRUD Operations** - Create, read, update, delete books
- ✅ **Custom Genres** - Add custom genres or select from existing
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Material-UI** - Modern, accessible UI components
- ✅ **Redux State Management** - Centralized state management
- ✅ **Debounced Search** - Optimized search performance
