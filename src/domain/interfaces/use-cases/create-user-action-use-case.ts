
import { UserActionRequestModel } from "../../models/userAction";

export interface CreateUserActionUseCase {
    execute(userActionRequestModel: UserActionRequestModel): Promise<any>
}