import { UserActionRequestModel } from "../../domain/models/userAction";

export interface UserActionDataSource {
    create(UserActionRequestModel: UserActionRequestModel): Promise<any>;
}