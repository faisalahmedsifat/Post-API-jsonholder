import { UserActionRequestModel } from "../../domain/models/userAction";

/**
 * Represents the UserActionDataSource interface.
 */
export interface UserActionDataSource {
    /**
     * Creates a user action.
     * @param UserActionRequestModel The user action request model.
     * @returns A promise that resolves to any.
     */
    create(UserActionRequestModel: UserActionRequestModel): Promise<any>;
}