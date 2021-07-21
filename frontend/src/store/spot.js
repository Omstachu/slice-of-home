const LOAD = 'spot/LOAD'
const ADD_ONE = 'spot/ADD_ONE'

const load = list => ({
    type: LOAD,
    list,
})

const addOneSpot = spot => ({
    type: ADD_ONE,
    spot,
})

export const getSpot = () => async dispatch => {
    const res = await fetch('/api/spots')

    if (res.ok){
        const list = await res.json();
        dispatch(load(list))
    }
}

const initialState = {
    list: [],
}

export const getSpotDetail = (id) => async dispatch => {
    const res = await fetch(`/api/spots/${id}`)

    if (res.ok){
        const detail = await res.json()
        dispatch(addOneSpot(detail))
    }
}

const spotReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD:
        const allSpots = {}
        action.list.forEach(spot => {
            // console.log(spot)
            allSpots[spot.id] = spot
        })
        return {
            ...allSpots,
            ...state,
            list: [...action.list]
        }
        case ADD_ONE: {
            if (!state[action.spot.id]) {
                const newState = {
                    ...state,
                    [action.spot.id]: action.spot
                };
                const spotList = newState.list.map(id => newState[id])
                spotList.push(action.spot);
                return newState
            }
            return {
                ...state,
                [action.spot.id]: {
                    ...state[action.spot.id],
                    ...action.spot
                }
            }
        }
        default:
            return state

    }
}

export default spotReducer
