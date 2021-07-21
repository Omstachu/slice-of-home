import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getSpot} from '../../store/spot'

const SpotsDisplay = () => {

    const spotImages = useSelector(state => {
        return state.spot.list.map(spot=>{
            return spot.Images[0].url
        })
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpot())
    }, [dispatch])

    return (
        <main>
            <div>
                <h2>
                    Test
                </h2>
                {spotImages.map((image) => {
                    return (
                    <div>
                        <img src={image} alt="placeholder"/>
                    </div>
                    )
                })}
            </div>
        </main>
    )
}

export default SpotsDisplay
