import { IUser } from "../../../models/IUser";

export interface IAuthState {
    isAuth: boolean;
    user: IUser;
    isLoading: boolean;
    error: string | null;
}

export enum AuthActionsEnum {
    SET_AUTH = "SET_AUTH",
    SET_ERROR = "SET_ERROR",
    SET_USER = "SET_USER",
    SET_IS_LOADING = "SET_IS_LOADING",
}


export interface ISetAuthAction {
    type: AuthActionsEnum.SET_AUTH;
    payload: boolean;
}
export interface ISetErrorAction {
    type: AuthActionsEnum.SET_ERROR;
    payload: string | null;
}
export interface ISetIsLoadingAction {
    type: AuthActionsEnum.SET_IS_LOADING;
    payload: boolean;
}
export interface ISetUserAction {
    type: AuthActionsEnum.SET_USER;
    payload: IUser;
}

export type AuthAction =
    ISetAuthAction | ISetErrorAction | ISetIsLoadingAction | ISetUserAction