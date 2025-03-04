# PostgreSQL Database Setup

This is a PostgreSQL database setup that can run both locally and in Docker.

## 🔧 Prerequisites

1. PostgreSQL client tools (psql, pg_dump, pg_restore)
2. Docker and Docker Compose (for containerized setup)
3. Access to port 5432 (default PostgreSQL port)

### Installing Prerequisites

```bash
# macOS
brew install postgresql
brew install --cask pgadmin4  # Optional GUI tool

# Windows
# 1. Download PostgreSQL installer from https://www.postgresql.org/download/windows/
# 2. During installation, choose to install command line tools
# 3. Optional: Install pgAdmin

# Linux (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install postgresql-client
sudo apt-get install pgadmin4  # Optional GUI tool
```

## 🚀 Quick Start

The easiest way to get started is using the just commands from the root directory:

```bash
just dev db      # Start database in Docker
just docker db   # Start database in Docker (background)
just init db     # Initialize schema
just stop db     # Stop database
```

## 📋 Manual Setup

If you prefer to set things up manually:

1. Copy environment file:
   ```bash
   cp .env.example .env
   ```

2. Start PostgreSQL:
   ```bash
   # Using Docker
   docker compose up -d
   
   # Or locally if you have PostgreSQL installed
   pg_ctl start
   ```

3. Initialize database:
   ```bash
   psql -f init/01_schema.sql
   ```

## 🛠️ Development Commands

- `just init db` - Initialize database schema
- `just reset db` - Reset database (drop and recreate)
- `just backup db` - Create database backup
- `just restore db` - Restore from latest backup
- `just health-check db` - Check database health

## 🔒 Environment Variables

The `.env` file should contain:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=app_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

## ⚠️ Common Issues

1. **Port 5432 already in use**
   ```bash
   # Check what's using the port
   sudo lsof -i :5432
   
   # Stop local PostgreSQL if running
   sudo service postgresql stop  # Linux
   brew services stop postgresql # macOS
   ```

2. **Permission denied**
   ```bash
   # Check if POSTGRES_PASSWORD matches
   # Ensure your user has proper permissions:
   psql -U postgres -c "ALTER USER postgres WITH PASSWORD 'postgres';"
   ```

3. **psql: command not found**
   ```bash
   # Add PostgreSQL binaries to PATH. Add to ~/.bashrc or ~/.zshrc:
   # macOS (adjust version as needed)
   export PATH="/usr/local/opt/postgresql@14/bin:$PATH"
   # Windows
   export PATH="C:/Program Files/PostgreSQL/14/bin:$PATH"
   ```

4. **Windows-specific: FATAL: password authentication failed**
   ```bash
   # Edit pg_hba.conf to use md5 instead of scram-sha-256
   # Location: C:\Program Files\PostgreSQL\14\data\pg_hba.conf
   ```

## 🔍 Database Structure

The schema is defined in `init/01_schema.sql` and includes:
- Basic tables setup
- Indexes for performance
- Common functions and triggers

## 🐳 Docker

The Docker setup includes:
- PostgreSQL 15
- Persistent volume for data
- Automatic schema initialization
- Health checks

## 📊 Monitoring

To check database status:
```bash
# Using just
just health-check db

# Or manually
psql -U postgres -c "SELECT version();"
```

## 🔐 Security Notes

1. Never commit `.env` with real credentials
2. Change default passwords in production
3. Consider using connection pooling for production
4. Regularly update PostgreSQL to latest minor version
5. Back up your database regularly 