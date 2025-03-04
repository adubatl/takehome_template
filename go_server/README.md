# Go Server Setup

This is a Go backend server with a simple HTTP API setup.

## 🔧 Prerequisites

1. Go 1.21 or higher
2. golangci-lint (for linting)
3. Docker (optional, for containerization)

### Installing Prerequisites

```bash
# macOS
brew install go
brew install golangci-lint

# Windows
# 1. Install Go from https://golang.org/dl/
# 2. Install golangci-lint:
winget install golangci-lint

# Linux
# 1. Install Go:
wget https://golang.org/dl/go1.21.5.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz
# Add to ~/.profile:
export PATH=$PATH:/usr/local/go/bin

# 2. Install golangci-lint:
curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin
```

## 🚀 Quick Start

The easiest way to get started is using the just commands from the root directory:

```bash
just dev go      # Start development server
just docker go   # Run in Docker
just install go  # Install dependencies
just start go    # Quick start: install + run
```

## 📋 Manual Setup

If you prefer to set things up manually:

1. Install dependencies:
   ```bash
   go mod download
   ```

2. Run the server:
   ```bash
   go run ./cmd/server/main.go
   ```

3. Build the binary:
   ```bash
   go build -o bin/server ./cmd/server/main.go
   ```

## 🛠️ Development Commands

- `just test go` - Run tests
- `just test-coverage go` - Run tests with coverage report
- `just lint go` - Run linter
- `just build go` - Build binary
- `just clean go` - Clean build artifacts

## 🔒 Environment Variables

Create a `.env` file in the go_server directory with these variables:

```env
PORT=8080
ENV=development
```

## 📝 Code Style

This project uses:
- `gofmt` for code formatting (built into Go)
- `golangci-lint` for linting
- Go modules for dependency management

### Common Issues

1. **GOPATH not set**
   ```bash
   # Add to ~/.profile or ~/.bashrc:
   export GOPATH=$HOME/go
   export PATH=$PATH:$GOPATH/bin
   ```

2. **Permission denied on Linux/macOS**
   ```bash
   # Make the binary executable:
   chmod +x bin/server
   ```

3. **Module not found**
   ```bash
   # Try:
   go mod tidy
   ```

## 🐳 Docker

Build and run with Docker:
```bash
just docker go
```

Or manually:
```bash
docker build -t go-backend .
docker run -p 8080:8080 go-backend
```

## 🌐 API Documentation

Once running, visit:
- http://localhost:8080/health - Health check endpoint
- http://localhost:8080/api/v1 - API root 