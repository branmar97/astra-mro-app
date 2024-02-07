Effectively manage your assets, optimize schedules, and gain valuable insights on labor, spending, and downtime through a user-friendly interface.

## Getting Started

Using Node v20

First, install the dependencies from root:

```bash'
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Useful Commands

```bash
# Seed the database with data from seed.ts file
npx prisma db seed

# Run a prisma migration
npx prisma migrate dev --name name-here
```