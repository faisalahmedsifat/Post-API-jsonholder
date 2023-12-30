/**
 * This file defines the implementation of the UserActionRepository interface.
 * It provides methods to interact with the UserActionDataSource and perform CRUD operations on user actions.
 */

import { UserActionDataSource } from "../../data/interfaces/user-action-data-source";
import { UserActionRepository } from "../interfaces/repositories/user-action-repository";
import { UserActionRequestModel } from "../models/userAction";

/**
 * The UserActionRepositoryImpl class implements the UserActionRepository interface.
 * It handles the creation of user actions by delegating the task to the UserActionDataSource.
 */
export class UserActionRepositoryImpl implements UserActionRepository {
    userActionDataSource: UserActionDataSource;

    /**
     * Constructs a new instance of the UserActionRepositoryImpl class.
     * @param userActionDataSource The data source used to create user actions.
     */
    constructor(userActionDataSource: UserActionDataSource) {
        this.userActionDataSource = userActionDataSource;
    }

    /**
     * Creates a new user action.
     * @param userActionRequestModel The model containing the details of the user action to be created.
     * @returns A promise that resolves to the created user action.
     */
    createUserAction(userActionRequestModel: UserActionRequestModel): Promise<any> {
        return this.userActionDataSource.create(userActionRequestModel);
    }
}