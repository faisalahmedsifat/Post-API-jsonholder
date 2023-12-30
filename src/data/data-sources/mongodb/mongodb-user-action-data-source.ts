/**
 * This file contains the implementation of the MongoDBUserActionDataSource class.
 * It is responsible for interacting with the MongoDB database to perform user action data operations.
 */

import { UserActionModel, UserActionRequestModel } from "../../../domain/models/userAction";
import { NoSQLDatabaseWrapper } from "../../interfaces/nosql-database-wrapper";
import { UserActionDataSource } from "../../interfaces/user-action-data-source";

/**
 * Represents a data source for user action data using MongoDB as the underlying database.
 */
export class MongoDBUserActionDataSource implements UserActionDataSource {
    private database: NoSQLDatabaseWrapper;

    /**
     * Constructs a new instance of the MongoDBUserActionDataSource class.
     * @param database The NoSQL database wrapper used to interact with the MongoDB database.
     */
    constructor(database: NoSQLDatabaseWrapper) {
        this.database = database;
    }

    /**
     * Creates a new user action record in the MongoDB database.
     * @param userActionRequestModel The user action request model containing the data for the new user action.
     * @returns A promise that resolves to the result of the database operation.
     */
    async create(userActionRequestModel: UserActionRequestModel): Promise<any> {
        const userActionModel: UserActionModel = {
            keyword: userActionRequestModel.keyword,
            browser: userActionRequestModel.browser,
            createdAt: new Date(),
            modifiedAt: new Date(),
            posts: userActionRequestModel.posts,
        };
        const result = this.database.insertOneToMany(userActionModel);
        return result;
    }
}