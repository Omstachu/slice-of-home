import { useEffect } from "react";
import { NavLink } from "react-router-dom";
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

    const spotImages = spotsList.map(spot=>{
        return spot?.Images[0]
    })

    const handleDelete = async (e, spotId) => {
        e.preventDefault()
        const tripToDelete = userTrips.find(trip=>{
            return trip.spotId === spotId
        })
        await dispatch(deleteTrip(tripToDelete?.id))

        history.push('/spots')
        history.push('/')
    }

    return (
        <div className="trip-item-container">
            {(spotImages.length === 0) && (
                <h2>Your Collection is Empty!</h2>
            )}
            {spotImages.map((image,idx) => {
                return (
                        <div key={idx} className="trip-card-container">
                            <NavLink to={`/spots/${image?.spotId}`}>
                                <img className="spot-detail-image" src={image?.url} alt='NOT AVAILABLE'></img>
                            </NavLink>
                            <button className="trip-button" onClick={e=> handleDelete(e, image?.spotId)}>Delete</button>
                        </div>
                )
            })}
        </div>
    )

}


export default Trips
