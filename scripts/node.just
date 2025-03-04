# Node.js backend implementation

# Install dependencies
install:
    cd ../node_server && \
    if [ ! -d "node_modules" ]; then \
        echo "📦 Node modules not found, installing..." && \
        npm install; \
    fi

# Start development server
dev:
    cd ../node_server && \
    if [ ! -d "node_modules" ]; then \
        echo "📦 Node modules not found, installing..." && \
        npm install; \
    fi && \
    npm run dev

# Start in production mode
start:
    cd ../node_server && \
    if [ ! -d "node_modules" ]; then \
        echo "📦 Node modules not found, installing..." && \
        npm install; \
    fi && \
    npm run start

# Run in docker
docker:
    cd ../node_server && \
    if [ ! -f "Dockerfile" ]; then \
        echo "Error: Dockerfile not found in node_server directory" && \
        exit 1; \
    fi && \
    docker-compose up --build 