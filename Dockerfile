# Universal Blockchain Verification Hub (UBVH) Docker Configuration
# بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
# "One Verification Layer, Infinite Possibilities"

# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    curl

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY src/ ./src/

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S ubvh && \
    adduser -S ubvh -u 1001

# Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy configuration files
COPY --chown=ubvh:ubvh . .

# Create necessary directories
RUN mkdir -p logs && \
    mkdir -p uploads && \
    chown -R ubvh:ubvh /app

# Switch to non-root user
USER ubvh

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:3000/api/v1/health || exit 1

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV API_PREFIX=api/v1

# Islamic blessing and startup message
LABEL maintainer="Muhammad Adnan Ul Mustafa <adnanmd76@gmail.com>"
LABEL description="Universal Blockchain Verification Hub (UBVH) - Master Verification Layer"
LABEL version="1.0.0"
LABEL islamic.blessing="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
LABEL motto="One Verification Layer, Infinite Possibilities"

# Start the application
CMD ["npm", "start"]