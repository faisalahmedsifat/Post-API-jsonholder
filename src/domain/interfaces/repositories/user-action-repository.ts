/**
 * Represents the UserActionRepository interface.
 * It defines the contract for interacting with the user action repository.
 */
import { UserActionRequestModel } from "../../models/userAction";

export interface UserActionRepository {
    /**
     * Creates a user action.
     * @param userActionRequestModel The user action request model.
     * @returns A promise that resolves to any value.
     */
    createUserAction(userActionRequestModel: UserActionRequestModel): Promise<any>;
}