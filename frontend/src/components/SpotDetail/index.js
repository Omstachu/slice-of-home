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
    const [showDeleteForm, setShowDeleteForm] = useState(false)

    const {id} = useParams()

    // const spotInfo = useSelector(state => {
    //     return state.spot.find(spot=>{
    //         return spot.list
    //     })
    // })





    const spot = useSelector(state => {
        return state.spot
    })

    const sessionUser = useSelector(state => state.session)
    const sessionUserId = sessionUser.user.id

    const spotUserId = spot[id]?.userId
    console.log("postUserId", spotUserId, "\nsessionId", sessionUserId)

    const postBelongsToUser = spotUserId === sessionUserId


    // console.log("id", id)
    // console.log("spot", spot)
    // console.log("spot.id", spot[id])

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
    if (spot[id]?.Images){
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

    let editContent = null
    let deleteButton = null

    if(showEditForm) {
        editContent = (
            <EditSpotForm spotId={id} hideForm={() => setShowEditForm(false)}/>
        )
    }
    if(showDeleteForm) {
        deleteButton = (
            <button onClick={handleDelete}>Delete</button>
        )
    }



    return (
        <div>
            <h1>{name}</h1>
            <a href={image}>
                <img src={image} alt={name}/>
            </a>
            <p>{description}</p>
            {postBelongsToUser && (
                <button onClick={handleDelete}>Delete</button>
            )}
            {deleteButton}

            {(!showEditForm && postBelongsToUser) && (
                <button onClick={() => setShowEditForm(true)}>Edit</button>
            )}
            <div>
                {editContent}
            </div>
        </div>
    )
}

export default SpotDetail
