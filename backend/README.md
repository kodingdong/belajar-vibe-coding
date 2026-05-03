# Belajar Vibe Backend

A modern backend service built with **Bun**, **ElysiaJS**, and **Drizzle ORM** for MySQL.

## Tech Stack

- **Runtime:** [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- **Framework:** [ElysiaJS](https://elysiajs.com/) - Lightweight TypeScript framework
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/) - Type-safe SQL query builder
- **Database:** MySQL

## Prerequisites

- [Bun](https://bun.sh/) (v1.0.0 or higher)
- MySQL database

## Getting Started

### 1. Setup Environment Variables

Copy the example environment file and configure your MySQL connection:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=belajar_vibe
PORT=3000
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Setup Database Schema

Generate and push the Drizzle schema to your MySQL database:

```bash
bun run db:push
```

Or if you prefer to generate migrations separately:

```bash
bun run db:generate
```

### 4. Run Development Server

```bash
bun run dev
```

The server will start on `http://localhost:3000`

## Available Endpoints

### Health & Status

- `GET /` - Welcome message and API info
- `GET /health` - Health check endpoint

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
  - Body: `{ name: string, email: string }`

### Posts

- `GET /posts` - Get all posts (ordered by newest first)
- `POST /posts` - Create new post
  - Body: `{ userId: number, title: string, content?: string }`

## Scripts

- `bun run dev` - Run development server with watch mode
- `bun run build` - Build for production
- `bun run start` - Run production build
- `bun run db:generate` - Generate Drizzle migrations
- `bun run db:push` - Push schema changes to database

## Project Structure

```
backend/
├── src/
│   ├── index.ts           # Main application entry point
│   └── db/
│       ├── index.ts       # Database connection
│       └── schema.ts      # Drizzle schema definitions
├── drizzle/               # Generated migrations (auto-created)
├── drizzle.config.ts      # Drizzle configuration
├── bunfig.toml           # Bun configuration
├── package.json
└── README.md
```

## Example Requests

### Create a User

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{ "name": "John Doe", "email": "john@example.com" }'
```

### Get All Users

```bash
curl http://localhost:3000/users
```

### Create a Post

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{ "userId": 1, "title": "My First Post", "content": "This is my first post" }'
```

### Get All Posts

```bash
curl http://localhost:3000/posts
```

## Documentation

- [ElysiaJS Documentation](https://elysiajs.com/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Bun Documentation](https://bun.sh/docs)

## Notes

- The `.env` file should never be committed to version control
- Use `.env.example` as a template for developers
- Database migrations are stored in the `drizzle/` directory
