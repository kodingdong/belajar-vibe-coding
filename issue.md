# Project Setup: ElysiaJS + Drizzle + MySQL (Bun)

## Goal
Initialize a new backend service within the `belajar-vibe-coding` repository using the Bun runtime, ElysiaJS framework, and Drizzle ORM connected to a MySQL database.

## Technical Stack
- **Runtime:** [Bun](https://bun.sh/)
- **Framework:** [ElysiaJS](https://elysiajs.com/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** MySQL

## High-Level Implementation Steps

### 1. Initialization
- Create a new directory for the project.
- Initialize the project using `bun init`.
- Install necessary dependencies:
  - `elysia`
  - `drizzle-orm`
  - `mysql2` (for the driver)
- Install development dependencies:
  - `drizzle-kit` (for migrations)

### 2. Database & Schema Configuration
- Setup a `.env` file to manage MySQL connection credentials.
- Define the Drizzle schema file (e.g., `src/db/schema.ts`).
- Configure `drizzle.config.ts` to point to the schema and database connection.
- Initialize the database connection in a dedicated module (e.g., `src/db/index.ts`).

### 3. API Structure (ElysiaJS)
- Create a basic Elysia server entry point (`src/index.ts`).
- Implement a simple "Health Check" or "Hello World" endpoint to verify the server is running.
- (Optional) Scaffold a basic CRUD route to demonstrate Drizzle integration with a sample table.

### 4. Scripts & Workflow
- Ensure `package.json` includes scripts for:
  - `dev`: Running the server in watch mode with Bun.
  - `db:generate`: Creating migration files via Drizzle Kit.
  - `db:push`: Syncing schema changes directly to the database (for rapid development).

## Verification
- Confirm the server starts without errors using `bun dev`.
- Verify the Drizzle schema can be generated/pushed to a local MySQL instance.
- Test the initial endpoint via `curl` or a browser.
