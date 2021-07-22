import { NavLink } from 'react-router-dom';

import {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { deleteSpot, getSpotDetail } from '../../store/spot';
import EditSpotForm from '../EditSpotForm';

const SpotDetail = () => {
    // const [name, setName] = useState('')
    // const [description, setDescription] = useState('')
    // const [image, setImage] = useState('')

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

    console.log("id", id)
    console.log("spot", spot)
    console.log("spot.id", spot[id])

    const dispatch = useDispatch()
    const history = useHistory()

    // if (!spot[id]){
    //     history.push('/')
    // }

    // console.log(spot[id].name)
    // useEffect(()=>{
    //     setName(spot[id].name)
    //     setDescription(spot[id].description)
    //     setImage(spot[id].image)
    // }, [spot, id])

    const name = spot[id]?.name
    const description = spot[id]?.description
    let image;
    if (spot[id]){
        if (spot[id]?.Images[0]?.url){
            image = spot[id]?.Images[0]?.url
        }
    } else {
        image = null
    }
    // const images = spot[id]?.Images.map(image => image.url)

    // console.log("image: ", image)
    // console.log("spot: ", spot[id])


    useEffect(() => {
        dispatch(getSpotDetail(id))
    }, [dispatch,id])

    useEffect(()=> {
        if (!spot[id]){
            history.push('/')
        }
    })

    const handleDelete = async e => {
        await dispatch(deleteSpot(id))
        history.push('/spots')

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
            <button onClick={handleDelete}>Delete</button>
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
