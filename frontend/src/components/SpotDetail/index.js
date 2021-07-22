import {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { deleteSpot, getSpotDetail } from '../../store/spot';


const SpotDetail = () => {

    const {id} = useParams()

    // const spotInfo = useSelector(state => {
    //     return state.spot.find(spot=>{
    //         return spot.list
    //     })
    // })


    const spot = useSelector(state => {
        return state.spot
    })

    const dispatch = useDispatch()
    const history = useHistory()

    if (!spot[id]){
        history.push('/')
    }

    const name = spot[id]?.name
    const description = spot[id]?.description
    let image;
    if (spot[id]?.Images[0]?.url){
        image = spot[id]?.Images[0]?.url
    } else {
        image = null
    }
    // const images = spot[id]?.Images.map(image => image.url)

    // console.log("image: ", image)
    // console.log("spot: ", spot[id])


    useEffect(() => {
        dispatch(getSpotDetail(id))
    }, [dispatch,id])

    const handleClick = async e => {
        const res = await dispatch(deleteSpot(id))

        let deletedSpot;
        if (deletedSpot) {
            history.push('/spots')
        }
    }

    return (
        <div>
            <h1>{name}</h1>
            <img src={image} alt={name}/>
            <p>{description}</p>
            <button onClick={handleClick}>Delete</button>
        </div>
    )
}

export default SpotDetail
