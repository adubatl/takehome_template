// Create application database and user
db = db.getSiblingDB('app_db');

// Create user if doesn't exist
if (db.getUser(process.env.MONGO_USER) == null) {
    db.createUser({
        user: process.env.MONGO_USER,
        pwd: process.env.MONGO_PASSWORD,
        roles: ["readWrite", "dbAdmin"]
    });
}

// Create collections
db.createCollection('users');

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "createdAt": 1 });

// Insert sample data if collection is empty
if (db.users.countDocuments() === 0) {
    db.users.insertMany([
        {
            email: 'admin@example.com',
            name: 'Admin User',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            email: 'test@example.com',
            name: 'Test User',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
}

// Print status
print('Database initialization complete');
print('Collections created:', db.getCollectionNames());
print('Users count:', db.users.countDocuments()); 