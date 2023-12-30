/**
 * This file contains the implementation of the MongoDBDatabaseWrapper class,
 * which is responsible for connecting to MongoDB and performing database operations.
 */

require("dotenv").config();
import mongoose, { Schema } from "mongoose";

import { NoSQLDatabaseWrapper } from "../../interfaces/nosql-database-wrapper";

export class MongoDBDatabaseWrapper implements NoSQLDatabaseWrapper {
    private static instance: MongoDBDatabaseWrapper;
    private userActionSchema: Schema;
    private postSchema: Schema;
    private userActionModel: any;
    private postModel: any;
    private url: string = "";

    private constructor() {
        mongoose.set("strictQuery", false);
        this.url = process.env.TEST_MONGODB_URI || process.env.MongoDB_URI || "";
        this.connect(this.url);

        // Define the schema for the 'Post' collection
        this.postSchema = new mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            id: Number,
            title: String,
            body: String,
            userId: Number,
        });

        // Define the schema for the 'UserAction' collection
        this.userActionSchema = new mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            keyword: String,
            browser: String,
            createdAt: Date,
            modifiedAt: Date,
            posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        });

        // Create the models for the 'Post' and 'UserAction' collections
        this.userActionModel = mongoose.model("UserAction", this.userActionSchema);
        this.postModel = mongoose.model("Post", this.postSchema);
    }

    private async connect(url: string) {
        // Connect to MongoDB using the provided URL
        mongoose
            .connect(url)
            .then((result: any) => {
                console.log("connected to MongoDB");
            }).catch((error: any) => {
                console.log("\nerror connecting to MongoDB\nPlease check your connection string\n");
            });
    }

    public static getInstance(): MongoDBDatabaseWrapper {
        // Singleton pattern to ensure only one instance of MongoDBDatabaseWrapper is created
        if (!MongoDBDatabaseWrapper.instance) {
            MongoDBDatabaseWrapper.instance = new MongoDBDatabaseWrapper();
        }
        return MongoDBDatabaseWrapper.instance;
    }

    public async insertOneToMany(data: any): Promise<any> {
        // Create a new UserAction document
        const userAction = new this.userActionModel({
            _id: new mongoose.Types.ObjectId(),
            keyword: data.keyword,
            browser: data.browser,
            createdAt: data.createdAt,
            modifiedAt: data.modifiedAt,
        });

        const postIds = [];
        console.log("posts count", data.posts.length)
        for (const post of data.posts) {
            // Create a new Post document for each post in the data
            let postAction = this.postModel({
                _id: new mongoose.Types.ObjectId(),
                id: post.id,
                title: post.title,
                body: post.body,
                userId: post.userId,
            });

            // Save the Post document to the database
            await postAction.save();

            // Add the Post document's _id to the postIds array
            postIds.push(postAction._id);
        }

        // Add the postIds array to the UserAction document's posts field
        userAction.posts.push(...postIds);
        userAction.modifiedAt = new Date();

        // Save the UserAction document to the database
        await userAction.save();

        return data;
    }
}