import { csrfFetch } from "./csrf";

const LOAD = 'trip/LOAD'
const ADD_ONE = 'trip/ADD_ONE'

const load = list => ({
    type: LOAD,
    list,
})

const addOneTrip = trip => ({
    type: ADD_ONE,
    trip,
})

export const getTrips = () => async dispatch => {
    const res = await fetch('/api/trips')

    if (res.ok){
        const list = await res.json();
        dispatch(load(list))
    }
}

export const addTrip = (payload) => async dispatch => {
    const res = await csrfFetch('/api/trips', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })

    const newTrip = await res.json()

    if(res.ok){
        dispatch(addOneTrip(newTrip))
    }
}

export const deleteTrip = (id) => async dispatch => {
    const res = await csrfFetch(`/api/trips/${id}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
    })

    return await res.json()
}


const initialState = {
    list: []
}

const tripReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD: {
            const allTrips = {}
            if(action.list) {
                action.list.forEach(trip => {
                    allTrips[trip.id] = trip
                })
            }
            return {
                ...allTrips,
                ...state,
                list: [...action.list]
            }

        }

        case ADD_ONE: {
            if (!state[action.trip?.id]){

                const newState = {...state, [action.trip.id]: action.trip}
                const tripList = newState.list.map(id => newState[id])
                tripList.push(action.trip);
                return newState
            }
            return {
                ...state,
                [action.trip.id]: {
                    ...state[action.trip.id],
                    ...action.trip
                },
            }
            }
        default:
            return state;
    }
}

export default tripReducer
