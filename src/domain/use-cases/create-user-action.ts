import { UserActionRepository } from "../interfaces/repositories/user-action-repository";
import { CreateUserActionUseCase } from "../interfaces/use-cases/create-user-action-use-case";
import { UserActionRequestModel } from "../models/userAction";

export class CreateUserAction implements CreateUserActionUseCase {
    userActionRepository: UserActionRepository;

    constructor(userActionRepository: UserActionRepository) {
        this.userActionRepository = userActionRepository;
    }

    execute(userActionRequestModel: UserActionRequestModel): Promise<any> {
        return this.userActionRepository.createUserAction(userActionRequestModel);
    }
}