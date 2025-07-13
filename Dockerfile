# Multi-stage build for production
FROM node:18-alpine AS client-build

# Build client
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --only=production
COPY client/ ./
RUN npm run build

# Production server
FROM node:18-alpine AS production

WORKDIR /app

# Copy server files
COPY package*.json ./
RUN npm ci --only=production

COPY . .
COPY --from=client-build /app/client/build ./client/build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S sentinelheaders -u 1001

# Change ownership
RUN chown -R sentinelheaders:nodejs /app
USER sentinelheaders

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "server.js"]