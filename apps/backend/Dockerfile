# Stage 1: Build
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies for nesting build)
RUN pnpm install --frozen-lockfile

# Copy the rest of the backend source code
COPY . .

# Build the NestJS application
RUN pnpm run build

# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

# Install pnpm in the runner stage too
RUN npm install -g pnpm

# Copy only the production dependencies and the built dist folder
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# We don't need devDependencies in production
RUN pnpm prune --prod

# Set environment to production
ENV NODE_ENV=production

# Expose the port NestJS is listening on
EXPOSE 4000

# Start the application
CMD ["node", "dist/main"]
