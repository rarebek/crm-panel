# Use the latest Node.js LTS version with Alpine for a lightweight image
FROM node:18-alpine AS development

# Set working directory
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files for dependency installation
COPY package*.json ./

# Install only the necessary packages for development
RUN pnpm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN pnpm run build

# Prepare the production image
FROM node:18-alpine AS production

# Set the NODE_ENV environment variable to production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set working directory
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy only the package files again to ensure proper layer caching
COPY package*.json ./

# Install only production dependencies
RUN pnpm install --prod

# Copy built application from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Expose the port your app runs on (if applicable)
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]
