
import { UserActionRequestModel } from "../../models/userAction";

export interface UserActionRepository {
    createUserAction(userActionRequestModel: UserActionRequestModel): Promise<any>
}