# MongoDB database implementation

# Start database server (Docker)
dev:
    cd ../mongo_server && \
    if [ ! -f ".env" ]; then \
        echo "⚠️ .env file not found, creating from template..." && \
        cp .env.example .env; \
    fi && \
    docker compose up

# Run database in background (Docker)
docker:
    cd ../mongo_server && docker compose up -d

# Stop database (Docker)
stop:
    cd ../mongo_server && docker compose down

# Initialize database with sample data
init:
    cd ../mongo_server && \
    if [ -f ".env" ]; then \
        . .env && \
        mongosh "mongodb://$$MONGO_USER:$$MONGO_PASSWORD@$$MONGO_HOST:$$MONGO_PORT/$$MONGO_DB" init/01_init.js; \
    else \
        echo "⚠️ .env file not found"; \
        exit 1; \
    fi

# Reset database (drops and recreates)
reset:
    cd ../mongo_server && \
    if [ -f ".env" ]; then \
        . .env && \
        mongosh "mongodb://$$MONGO_USER:$$MONGO_PASSWORD@$$MONGO_HOST:$$MONGO_PORT/$$MONGO_DB" --eval "db.dropDatabase();" && \
        just mongo init; \
    else \
        echo "⚠️ .env file not found"; \
        exit 1; \
    fi

# Create database backup
backup:
    cd ../mongo_server && \
    if [ -f ".env" ]; then \
        . .env && \
        mkdir -p backups && \
        mongodump --uri="mongodb://$$MONGO_USER:$$MONGO_PASSWORD@$$MONGO_HOST:$$MONGO_PORT/$$MONGO_DB" --out=backups/backup_$$(date +%Y%m%d_%H%M%S); \
    else \
        echo "⚠️ .env file not found"; \
        exit 1; \
    fi

# Restore database from latest backup
restore:
    cd ../mongo_server && \
    if [ -f ".env" ]; then \
        . .env && \
        LATEST_BACKUP=$$(ls -td backups/*/ | head -n1) && \
        if [ -n "$$LATEST_BACKUP" ]; then \
            mongorestore --uri="mongodb://$$MONGO_USER:$$MONGO_PASSWORD@$$MONGO_HOST:$$MONGO_PORT/$$MONGO_DB" --drop "$$LATEST_BACKUP"; \
        else \
            echo "No backup directories found in backups/"; \
            exit 1; \
        fi; \
    else \
        echo "⚠️ .env file not found"; \
        exit 1; \
    fi

# Check database health
health-check:
    cd ../mongo_server && \
    if [ -f ".env" ]; then \
        . .env && \
        mongosh "mongodb://$$MONGO_USER:$$MONGO_PASSWORD@$$MONGO_HOST:$$MONGO_PORT/$$MONGO_DB" --eval "db.runCommand({ ping: 1 })" && \
        echo "🏥 Database health check complete"; \
    else \
        echo "⚠️ .env file not found"; \
        exit 1; \
    fi 