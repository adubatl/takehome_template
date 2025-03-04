# Vue frontend implementation

# Start development server
dev:
    cd ../vue_frontend && \
    if [ ! -d "node_modules" ]; then \
        echo "📦 node_modules not found, installing dependencies..." && \
        npm install; \
    fi && \
    npm run dev

# Build and run in docker
docker:
    cd ../vue_frontend && \
    if [ ! -f "Dockerfile" ]; then \
        echo "Error: Dockerfile not found in vue_frontend directory" && \
        exit 1; \
    fi && \
    docker build -t vue-frontend . && \
    docker run -p 5173:5173 vue-frontend

# Install dependencies
install:
    cd ../vue_frontend && \
    if [ ! -f "package.json" ]; then \
        echo "Error: package.json not found in vue_frontend directory" && \
        exit 1; \
    fi && \
    npm install

# Quick start: install and run
start: install dev

# Clean build artifacts
clean:
    cd ../vue_frontend && \
    rm -rf dist && \
    rm -rf node_modules && \
    echo "✨ Cleaned Vue build artifacts"

# Rebuild from scratch
rebuild: clean install
    cd ../vue_frontend && npm run build

# Type checking
typecheck:
    cd ../vue_frontend && vue-tsc --noEmit

# Run tests
test:
    cd ../vue_frontend && npm test

# Health check
health-check: typecheck
    echo "🏥 Vue frontend health check complete" 