import { NavLink } from 'react-router-dom';

import {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { deleteSpot, getSpotDetail } from '../../store/spot';
import EditSpotForm from '../EditSpotForm';

const SpotDetail = () => {
    const [showEditForm, setShowEditForm] = useState(false)
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

    let content = null

    if(showEditForm) {
        content = (
            <EditSpotForm spotId={id} hideForm={() => setShowEditForm(false)}/>
        )
    }

    return (
        <div>
            <h1>{name}</h1>
            <a href={image}>
                <img src={image} alt={name}/>
            </a>
            <p>{description}</p>
            <button onClick={handleClick}>Delete</button>
            {!showEditForm && (
                <button onClick={() => setShowEditForm(true)}>Edit</button>
            )}
            <div>
                {content}
            </div>
        </div>
    )
}

export default SpotDetail
