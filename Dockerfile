# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config
COPY --from=builder /app/schemas ./schemas
COPY --from=builder /app/.env.example ./
RUN adduser -D beacon
USER beacon
EXPOSE 8080
CMD ["node", "dist/app.js"]
