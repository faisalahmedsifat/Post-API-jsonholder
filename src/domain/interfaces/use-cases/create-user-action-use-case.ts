/**
 * Represents the interface for the use case of creating a user action.
 */
import { UserActionRequestModel } from "../../models/userAction";

export interface CreateUserActionUseCase {
    /**
     * Executes the use case of creating a user action.
     * @param userActionRequestModel The request model for creating a user action.
     * @returns A promise that resolves to any result.
     */
    execute(userActionRequestModel: UserActionRequestModel): Promise<any>
}