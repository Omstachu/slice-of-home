import {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import './SpotDisplay.css'

import {getSpot} from '../../store/spot'

const SpotsDisplay = () => {

    const spots = useSelector(state => {
        return state.spot.list
    })

    // console.log(spots)

    // const spotImages = useSelector(state => {
    //     return state.spot.list.map(spot=>{
    //         return spot.Images[0]?.url
    //     })
    // })

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
                <div className= 'image-container'>
                    {spots.map((spot) => {
                        const image = spot.Images[0]?.url
                        return (
                            <div key={spot.id}>
                                <NavLink to={`/spots/${spot.id}`}>
                                    <div className = 'spot-display-card'>
                                        <img className="spot-display-image" src={image} alt="placeholder"/>
                                        <p className='spot-display-title'>{spot.name}</p>
                                    </div>
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}

export default SpotsDisplay
