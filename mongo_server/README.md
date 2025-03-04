# MongoDB Database Setup

This is a MongoDB setup that can run both locally and in Docker.

## 🔧 Prerequisites

1. MongoDB Shell (mongosh)
2. MongoDB Database Tools (mongodump, mongorestore)
3. Docker and Docker Compose (for containerized setup)
4. Access to port 27017 (default MongoDB port)

### Installing Prerequisites

```bash
# macOS
brew install mongodb-community
brew install mongosh
brew install mongodb-database-tools
brew install --cask mongodb-compass  # Optional GUI tool

# Windows
# 1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
# 2. Download MongoDB Shell from https://www.mongodb.com/try/download/shell
# 3. Download MongoDB Database Tools from https://www.mongodb.com/try/download/database-tools
# 4. Optional: Download MongoDB Compass (GUI tool)

# Linux (Ubuntu/Debian)
# Add MongoDB repository
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org mongodb-org-shell mongodb-database-tools
```

## 🚀 Quick Start

The easiest way to get started is using the just commands from the root directory:

```bash
just dev mongo      # Start MongoDB in Docker
just docker mongo   # Start MongoDB in Docker (background)
just init mongo     # Initialize with sample data
just stop mongo     # Stop MongoDB
```

## 📋 Manual Setup

If you prefer to set things up manually:

1. Copy environment file:
   ```bash
   cp .env.example .env
   ```

2. Start MongoDB:
   ```bash
   # Using Docker
   docker compose up -d
   
   # Or locally if you have MongoDB installed
   mongod --dbpath /data/db
   ```

3. Initialize database:
   ```bash
   mongosh mongodb://localhost:27017 init/01_init.js
   ```

## 🛠️ Development Commands

- `just init mongo` - Initialize with sample data
- `just reset mongo` - Reset database (drop and recreate)
- `just backup mongo` - Create database backup
- `just restore mongo` - Restore from latest backup
- `just health-check mongo` - Check database health

## 🔒 Environment Variables

The `.env` file should contain:

```env
MONGO_USER=admin
MONGO_PASSWORD=password
MONGO_DB=app_db
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=password
```

## ⚠️ Common Issues

1. **Port 27017 already in use**
   ```bash
   # Check what's using the port
   sudo lsof -i :27017
   
   # Stop local MongoDB if running
   sudo service mongod stop    # Linux
   brew services stop mongodb  # macOS
   ```

2. **Authentication failed**
   ```bash
   # Verify credentials in mongosh:
   mongosh "mongodb://localhost:27017/admin" --eval "db.auth('admin', 'password')"
   ```

3. **mongosh: command not found**
   ```bash
   # Ensure MongoDB Shell is installed and in PATH
   # Add to ~/.bashrc or ~/.zshrc:
   export PATH="/usr/local/opt/mongodb-community/bin:$PATH"
   ```

4. **Windows-specific: Data directory not found**
   ```bash
   # Create data directory:
   mkdir -p /data/db   # Unix
   md \data\db         # Windows
   ```

## 🔍 Database Structure

The initial setup in `init/01_init.js` includes:
- User creation
- Collection creation
- Indexes for performance
- Sample data insertion

## 🐳 Docker

The Docker setup includes:
- MongoDB 6.0
- Persistent volume for data
- Authentication enabled
- Health checks
- MongoDB Express admin interface (optional)

## 📊 Monitoring

To check database status:
```bash
# Using just
just health-check mongo

# Or manually
mongosh --eval "db.runCommand({ ping: 1 })"
```

## 🔐 Security Notes

1. Never commit `.env` with real credentials
2. Change default passwords in production
3. Enable authentication in production
4. Use SSL/TLS for remote connections
5. Regularly update MongoDB to latest minor version
6. Back up your database regularly

## 🌐 Admin Interface

MongoDB Express is included and available at:
- http://localhost:8081 (when using Docker)

Default credentials are in your .env file. 