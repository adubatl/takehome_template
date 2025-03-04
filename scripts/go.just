# Go backend implementation

# Start development server
dev:
    cd ../go_server && \
    if [ ! -f "go.sum" ]; then \
        echo "📦 Dependencies not found, installing..." && \
        go mod download; \
    fi && \
    go run ./cmd/server/main.go

# Build and run in docker
docker:
    cd ../go_server && \
    if [ ! -f "Dockerfile" ]; then \
        echo "Error: Dockerfile not found in go_server directory" && \
        exit 1; \
    fi && \
    docker build -t go-backend . && \
    docker run -p 8080:8080 go-backend

# Install dependencies
install:
    cd ../go_server && go mod download

# Quick start: install and run
start: install dev

# Clean build artifacts
clean:
    cd ../go_server && \
    rm -rf bin && \
    go clean -cache -testcache && \
    echo "✨ Cleaned Go build artifacts"

# Run tests
test:
    cd ../go_server && go test -v ./...

# Run tests with coverage
test-coverage:
    cd ../go_server && \
    go test -v -coverprofile=coverage.out ./... && \
    go tool cover -html=coverage.out

# Run linter
lint:
    cd ../go_server && golangci-lint run

# Build binary
build:
    cd ../go_server && \
    go build -o bin/server ./cmd/server/main.go

# Health check
health-check: test lint
    echo "🏥 Go backend health check complete" 