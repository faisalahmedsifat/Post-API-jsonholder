import { UserActionDataSource } from "../../data/interfaces/user-action-data-source";
import { UserActionRepository } from "../interfaces/repositories/user-action-repository";
import { PostModel } from "../models/post";
import { UserActionRequestModel } from "../models/userAction";

export class UserActionRepositoryImpl implements UserActionRepository {
    userActionDataSource: UserActionDataSource;
    constructor(userActionDataSource: UserActionDataSource) {
        this.userActionDataSource = userActionDataSource;
    }
    createUserAction(userActionRequestModel: UserActionRequestModel): Promise<any> {
        return this.userActionDataSource.create(userActionRequestModel);
    }
}