# List available recipes
default:
    @just --list

# A simple hello world example
hello:
    echo "Hello, World!"

# Example with arguments
greet name="World":
    echo "Hello, {{name}}!"

# Example of running multiple commands
build:
    echo "Building project..."
    echo "Step 1: Compile"
    echo "Step 2: Test"
    echo "Build complete!"

# Example of a recipe that depends on another
test: build
    echo "Running tests..."

# Example with environment variables
deploy env="development":
    echo "Deploying to {{env}} environment"
