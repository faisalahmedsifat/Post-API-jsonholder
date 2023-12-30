/**
 * Represents a user action entity in the system.
 */
import { PostModel } from "./post";
export interface UserActionModel {
    keyword: string;
    browser: string;
    createdAt: Date;
    modifiedAt: Date;
    posts: PostModel[];
}

export interface UserActionRequestModel {
    keyword: string;
    browser: string;
    posts: PostModel[];
}