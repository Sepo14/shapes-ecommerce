# Shapes Ecommerce

An online store for geometric shapes, built with Next.js, Prisma and PostgreSQL.

**Demo:** [shapes-ecommerce.vercel.app](https://shapes-ecommerce.vercel.app)

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) and React 19
- [Auth.js v5](https://authjs.dev) (`next-auth`) with `@auth/prisma-adapter`
- [Prisma 7](https://www.prisma.io) with PostgreSQL (`@prisma/adapter-pg`)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Zod](https://zod.dev) for validation, [Sonner](https://sonner.emilkowal.ski) for notifications
- TypeScript and [pnpm](https://pnpm.io)

## Data model

| Model | Description |
| --- | --- |
| `User` | Users with a `CUSTOMER` or `ADMIN` role |
| `Product` | Products with price, stock, image, category and optional tag |
| `Order` / `OrderItem` | Orders and the line items of each order |
| `Account`, `Session`, `VerificationToken` | Auth.js tables |

**Categories:** `TRIANGLE`, `QUADRILATERAL`, `POLYGON`, `CURVED`
**Tags:** `HOT`, `NEW`, `DISCOUNT`, `POPULAR`

## Requirements

- Node.js 20 or higher
- pnpm
- A PostgreSQL database (local, [Neon](https://neon.tech), [Supabase](https://supabase.com), etc.)

## Getting started

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/Sepo14/shapes-ecommerce.git
   cd shapes-ecommerce
   pnpm install
   ```

   The `postinstall` script generates the Prisma client automatically.

2. Create a `.env` file in the project root:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/shapes?sslmode=disable"
   AUTH_SECRET="generate-one-with: npx auth secret"
   ```

3. Apply the migrations and load the sample data:

   ```bash
   pnpm prisma migrate dev
   pnpm prisma db seed
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Sample data (seed)

The seed (`prisma/seed.ts`) is idempotent: you can run it multiple times without creating duplicates. It creates:

- 4 products, one for each image in `public/shapes/` (circle, square, triangle and octagon)
- 2 users for local development:

  | Role | Email | Password |
  | --- | --- | --- |
  | Admin | `admin@example.com` | `admin` |
  | Customer | `customer@example.com` | `customer` |

> **Important:** these credentials are for local development only. Do not use them on a public database.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Production server |
| `pnpm lint` | Linter (ESLint) |
| `pnpm prisma migrate dev` | Create and apply migrations locally |
| `pnpm prisma db seed` | Load the sample data |

## Project structure

```
├── actions/        Server Actions
├── app/            Routes and pages (App Router)
├── components/     UI components
├── context/        React contexts
├── lib/            Utilities and Prisma client
├── prisma/         Schema, migrations and seed
├── public/         Static files (includes public/shapes/)
└── auth.ts         Auth.js configuration
```

## Deploying to Vercel

1. Import the repository into [Vercel](https://vercel.com/new).
2. Set the `DATABASE_URL` (use your provider's *pooled* URL) and `AUTH_SECRET` environment variables.
3. Apply the migrations against the production database from your machine:

   ```bash
   DATABASE_URL="<production-url>" pnpm prisma migrate deploy
   ```

4. (Optional) Load the sample data with `pnpm prisma db seed`, using the same `DATABASE_URL`.

## License

Personal project for learning purposes.
