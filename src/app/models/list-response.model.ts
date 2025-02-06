import { IUser } from "./user.model";

export interface IListResponse {
    data: IUser[],
    limit: number;
    page: number;
    total: number;
}