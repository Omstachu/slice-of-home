import {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotDetail } from '../../store/spot';


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

    const name = spot[id]?.name
    const description = spot[id]?.description
    const image = spot[id]?.Images[0].url
    const images = spot[id]?.Images.map(image => image.url)

    // console.log("image: ", image)
    // console.log("spot: ", spot[id])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotDetail(id))
    }, [dispatch,id])


    return (
        <div>
            <h1>{name}</h1>
            <img src={image} alt={name}/>
            <p>{description}</p>
        </div>
    )
}

export default SpotDetail
