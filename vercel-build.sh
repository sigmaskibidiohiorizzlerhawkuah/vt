#!/bin/bash
# Vercel build script for Prisma + PostgreSQL

# Generate Prisma client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push

# Seed the database with initial data
npx ts-node prisma/seed.ts

# Build Next.js app
npm run build
