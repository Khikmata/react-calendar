import { AuthActionCreators } from "./auth/actionCreators";
import { EventActionCreators } from "./event/action-creators";

export const allActionsCreators = {
    ...AuthActionCreators,
    ...EventActionCreators,
}