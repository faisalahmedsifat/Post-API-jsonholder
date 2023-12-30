import { MongoDBDatabaseWrapper } from '../../../src/data/data-sources/mongodb/mongodb-database';

import mongoose from 'mongoose'

describe('MongoDBDatabaseWrapper', () => {
    let mongoDBWrapper: MongoDBDatabaseWrapper;

    beforeAll(() => {
        // Initialize the MongoDBDatabaseWrapper instance
        mongoDBWrapper = MongoDBDatabaseWrapper.getInstance();
    });

    afterAll(async () => {
        // Close the MongoDB connection after all tests
        await mongoose.connection.close();
    });

    it('should insert a document with one-to-many relationship', async () => {
        // Create sample data for testing
        const testData = {
            keyword: 'testKeyword',
            browser: 'testBrowser',
            createdAt: new Date(),
            modifiedAt: null,
            posts: [
                { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
                { id: 2, title: 'Post 2', body: 'Body 2', userId: 2 },
            ],
        };

        // Call the insertOneToMany method
        const result = await mongoDBWrapper.insertOneToMany(testData);

        // Perform assertions based on your requirements
        expect(result).toBeDefined();
        // Add more assertions based on your implementation
    }, 10000);
});
