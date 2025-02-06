import { IUserLocation } from "./user-location.model";

export interface IUser {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    picture: string;
    gender: string;
    email: string;
    dateOfBirth: string;
    phone: string;
    location: IUserLocation;
    registerDate: string;
    updatedDate: string;
}