import { IUser } from "../../../models/IUser";
import { AuthAction, AuthActionsEnum, ISetAuthAction, ISetErrorAction, ISetIsLoadingAction, ISetUserAction } from "./types";
import { AppDispatch } from "../..";
import axios from "axios";
import UserGetter from "../../../api/UserGetter";


export const AuthActionCreators = {
    setUser: (user: IUser): ISetUserAction => ({ type: AuthActionsEnum.SET_USER, payload: user }),
    setIsAuth: (auth: boolean): ISetAuthAction => ({ type: AuthActionsEnum.SET_AUTH, payload: auth }),
    setIsLoading: (payload: boolean): ISetIsLoadingAction => ({ type: AuthActionsEnum.SET_IS_LOADING, payload }),
    setError: (payload: string): ISetErrorAction => ({ type: AuthActionsEnum.SET_ERROR, payload }),

    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            setTimeout(async () => {
                const response = await UserGetter.getUsers()
                console.log(response)
                const mockUsers = response.data.find(user => user.username === username && user.password === password)
                console.log(mockUsers)
                if (mockUsers) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('username', mockUsers.username);
                    dispatch(AuthActionCreators.setUser(mockUsers))
                    dispatch(AuthActionCreators.setIsAuth(true))
                } else {
                    dispatch(AuthActionCreators.setError('Ошибка данных'))
                }
                dispatch(AuthActionCreators.setIsLoading(false))
            }, 1000)
        } catch (e) {
            dispatch(AuthActionCreators.setError('Произошла ошибка в вводе данных'))
        }
    },

    logout: () => async (dispatch: AppDispatch) => {

        localStorage.removeItem('auth')
        localStorage.removeItem('Username')
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setIsAuth(false));

    },
}