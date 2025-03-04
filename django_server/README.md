# Django Server Setup

This is a Django backend server with REST API support and development tools configured.

## 🔧 Prerequisites

1. Python 3.11 or higher
2. pip (Python package manager)
3. virtualenv or venv module
4. Docker (optional, for containerization)

## 🚀 Quick Start

The easiest way to get started is using the just commands from the root directory:

```bash
just dev django     # Start development server
just docker django  # Run in Docker
just install django # Install dependencies
just start django   # Quick start: install + run
```

## 📋 Manual Setup

If you prefer to set things up manually:

1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:
   ```bash
   # On Windows
   .\venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```

## 🛠️ Development Commands

- `just migrate django` - Run database migrations
- `just makemigrations django` - Create new migrations
- `just test django` - Run tests
- `just typecheck django` - Run type checking
- `just clean django` - Clean build artifacts

## 🔒 Environment Variables

Create a `.env` file in the django_server directory with these variables:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
```

## 📝 Code Style

This project uses:
- Black for code formatting
- isort for import sorting
- mypy for type checking
- pytest for testing

## 🐳 Docker

Build and run with Docker:
```bash
just docker django
```

Or manually:
```bash
docker build -t django-backend .
docker run -p 8000:8000 django-backend
```

## 🌐 API Documentation

Once running, visit:
- http://localhost:8000/admin/ - Django admin interface
- http://localhost:8000/api/ - API root (when endpoints are configured) 