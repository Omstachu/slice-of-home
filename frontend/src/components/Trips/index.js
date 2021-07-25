import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTrips, deleteTrip } from "../../store/trips";
import { getSpot } from "../../store/spot";
import './Trips.css'

const Trips = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const trips = useSelector(state => {
        return state.trip
    })

    const spot = useSelector(state => {
        return state.spot
    })

    const sessionUser = useSelector(state => state.session)
    const sessionUserId = sessionUser?.user?.id

    useEffect(() => {
        dispatch(getTrips())
        dispatch(getSpot())
    }, [dispatch])



    let tripsArr = trips.list.map(trip=>{
        return trip
    })

    const userTrips = tripsArr.filter(trip=>{
        return trip.userId === sessionUserId;
    })

    let spotsList = []

    userTrips.forEach(trip=>{
        spotsList.push(spot.list.find(spot=>spot.id === trip.spotId))
    })
    // const spotsList= spot.list.map(spot =>{
    //     return spot
    // })

    // const userSpots = spotsList.filter(spot=>{
    //     return spot.userId === sessionUserId;
    // })

    const spotImages = spotsList.map(spot=>{
        return spot?.Images[0]
    })

    // console.log('userTrips', userTrips)
    // console.log('images', spotImages)
    // console.log('spotsList', spotsList)
    // console.log('trips', trips)
    // console.log('tripsArr', tripsArr)
    // console.log('userTrips', userTrips)

    const handleDelete = async (e, spotId) => {
        e.preventDefault()
        const tripToDelete = userTrips.find(trip=>{
            return trip.spotId === spotId
        })
        await dispatch(deleteTrip(tripToDelete.id))
        // console.log(spotId)
        history.push('/')
    }

    return (
        <div className="trip-item-container">
            {(spotImages.length === 0) && (
                <h2>Your Collection is Empty!</h2>
            )}
            {spotImages.map((image,idx) => {
                return (
                        <div className="trip-card-container">
                            <img className="spot-detail-image" key={idx} src={image?.url} alt='name'></img>
                            <button className="trip-button" onClick={e=> handleDelete(e, image?.spotId)}>Delete</button>
                            {/* <button className="trip-button">Delete</button> */}
                        </div>
                )
            })}
        </div>
    )

}


export default Trips
