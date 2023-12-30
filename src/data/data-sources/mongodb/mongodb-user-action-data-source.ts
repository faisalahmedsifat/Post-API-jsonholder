import { UserActionModel, UserActionRequestModel } from "../../../domain/models/userAction";
import { NoSQLDatabaseWrapper } from "../../interfaces/nosql-database-wrapper";
import { UserActionDataSource } from "../../interfaces/user-action-data-source";

export class MongoDBUserActionDataSource implements UserActionDataSource {
    private database: NoSQLDatabaseWrapper;

    constructor(database: NoSQLDatabaseWrapper) {
        this.database = database;
    }

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