
import { AppDispatch } from "../.."
import UserGetter from "../../../api/UserGetter"
import { IEvent } from "../../../models/IEvent"
import { IUser } from "../../../models/IUser"
import { SetGuestsAction, SetEventsAction, EventActionEnum } from "./types"

export const EventActionCreators = {
    setGuest: (payload: IUser[]): SetGuestsAction => ({ type: EventActionEnum.SET_GUESTS, payload }),
    setEvents: (payload: IEvent[]): SetEventsAction => ({ type: EventActionEnum.SET_EVENTS, payload }),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserGetter.getUsers()
            dispatch(EventActionCreators.setGuest(response.data));
        } catch (error) {
            console.log(error)
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[];
            json.push(event);
            dispatch(EventActionCreators.setEvents(json));
            localStorage.setItem('events', JSON.stringify(json))
        } catch (error) {
            console.log(error
            )
        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[];
            const currentUserEvents = json.filter(event => event.author === username || event.guest === username)
            dispatch(EventActionCreators.setEvents(currentUserEvents))
        } catch (error) {
            console.log(error)
        }
    }
}
