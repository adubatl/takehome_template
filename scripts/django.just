# Django backend implementation

# Start development server
dev:
    cd ../django_server && \
    if [ ! -d "venv" ]; then \
        echo "🐍 Virtual environment not found, setting up..." && \
        python -m venv venv && \
        . venv/bin/activate && \
        pip install -r requirements.txt; \
    fi && \
    . venv/bin/activate && \
    python manage.py migrate && \
    python manage.py runserver

# Build and run in docker
docker:
    cd ../django_server && \
    if [ ! -f "Dockerfile" ]; then \
        echo "Error: Dockerfile not found in django_server directory" && \
        exit 1; \
    fi && \
    docker build -t django-backend . && \
    docker run -p 8000:8000 django-backend

# Install dependencies
install:
    cd ../django_server && \
    if [ ! -d "venv" ]; then \
        python -m venv venv && \
        . venv/bin/activate && \
        pip install -r requirements.txt; \
    fi

# Quick start: install and run
start: install dev

# Clean build artifacts
clean:
    cd ../django_server && \
    rm -rf venv && \
    find . -type d -name "__pycache__" -exec rm -r {} + && \
    find . -type f -name "*.pyc" -delete && \
    echo "✨ Cleaned Django build artifacts"

# Run tests
test:
    cd ../django_server && \
    . venv/bin/activate && \
    python manage.py test

# Type checking
typecheck:
    cd ../django_server && \
    . venv/bin/activate && \
    mypy .

# Run migrations
migrate:
    cd ../django_server && \
    . venv/bin/activate && \
    python manage.py migrate

# Make migrations
makemigrations:
    cd ../django_server && \
    . venv/bin/activate && \
    python manage.py makemigrations

# Health check
health-check: typecheck test
    echo "🏥 Django backend health check complete" 