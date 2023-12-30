/**
 * Represents the implementation of the CreateUserActionUseCase interface.
 */
import { UserActionRepository } from "../interfaces/repositories/user-action-repository";
import { CreateUserActionUseCase } from "../interfaces/use-cases/create-user-action-use-case";
import { UserActionRequestModel } from "../models/userAction";

export class CreateUserAction implements CreateUserActionUseCase {
    userActionRepository: UserActionRepository;

    /**
     * Initializes a new instance of the CreateUserAction class.
     * @param userActionRepository The user action repository.
     */
    constructor(userActionRepository: UserActionRepository) {
        this.userActionRepository = userActionRepository;
    }

    /**
     * Executes the create user action use case.
     * @param userActionRequestModel The user action request model.
     * @returns A promise that resolves to the created user action.
     */
    execute(userActionRequestModel: UserActionRequestModel): Promise<any> {
        return this.userActionRepository.createUserAction(userActionRequestModel);
    }
}