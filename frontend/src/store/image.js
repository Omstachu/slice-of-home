import { csrfFetch } from "./csrf";

const LOAD = '/image/LOAD'
const ADD_ONE = 'image/ADD_ONE'

const load = list => ({
    type: LOAD,
    list,
})

const addOneImage = image => ({
    type: ADD_ONE,
    image,
})

export const getImage = () => async dispatch => {
    const res = await fetch('/api/images')

    if (res.ok) {
        const list = await res.json()
        dispatch(load(list))
    }
}

export const addImageForm = (payload) => async dispatch => {
    const res = await csrfFetch('/api/images', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })

    console.log("payload", payload)

    const newImage = await res.json()

    if(res.ok){
        dispatch(addOneImage(newImage))
    }
}

const initialState = {
    list: []
}

const imageReducer = (state = initialState, action) =>{
    switch (action.type){
        case LOAD: {
            const allImages = {}
            if(action.list) {
                action.list.forEach(image => {
                    allImages[image.id] = image
                })
            }
            return {
                ...allImages,
                ...state,
                list: [...action.list]
            }
        }

        case ADD_ONE: {
        if (!state[action.image?.id]){

            const newState = {...state, [action.image.id]: action.image}
            const imageList = newState.list.map(id => newState[id])
            imageList.push(action.image);
            return newState
        }
        return {
            ...state,
            [action.image.id]: {
                ...state[action.image.id],
                ...action.image
            },
        }
        }
        default:
            return state
    }
}

export default imageReducer
