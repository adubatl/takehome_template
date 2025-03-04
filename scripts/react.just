# React frontend implementation

# Start development server
dev:
    cd ../react_frontend && \
    if [ ! -d "node_modules" ]; then \
        echo "📦 node_modules not found, installing dependencies..." && \
        npm install; \
    fi && \
    npm run dev

# Build and run in docker
docker:
    cd ../react_frontend && \
    if [ ! -f "Dockerfile" ]; then \
        echo "Error: Dockerfile not found in react_frontend directory" && \
        exit 1; \
    fi && \
    docker build -t react-frontend . && \
    docker run -p 5173:5173 react-frontend

# Install dependencies
install:
    cd ../react_frontend && \
    if [ ! -f "package.json" ]; then \
        echo "Error: package.json not found in react_frontend directory" && \
        exit 1; \
    fi && \
    npm install

# Quick start: install and run
start: install dev

# Clean build artifacts
clean:
    cd ../react_frontend && \
    rm -rf dist && \
    rm -rf node_modules && \
    echo "✨ Cleaned React build artifacts"

# Rebuild from scratch
rebuild: clean install
    cd ../react_frontend && npm run build

# Type checking
typecheck:
    cd ../react_frontend && npx tsc --noEmit

# Run tests
test:
    cd ../react_frontend && npm test

# Health check
health-check: typecheck
    echo "🏥 React frontend health check complete"