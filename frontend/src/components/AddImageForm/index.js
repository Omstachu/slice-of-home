import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addImageForm, getImage } from "../../store/image";
import './AddImageForm.css'

const AddImageForm = ({spotId, hideForm}) =>{
    const [imageUrl, setImageUrl] = useState('')

    const updateImageUrl = (e) => setImageUrl(e.target.value)

    const {id} = useParams();
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=> {
        dispatch(getImage())
    }, [dispatch])

    const onSubmit = async(e) => {
        e.preventDefault()

        const payload = {
            spotId,
            url: imageUrl
        }

        await dispatch(addImageForm(payload))
        console.log(id);
        hideForm()
        history.push('/')
        history.push(`/spots/${id}`)
    }

    const handleCancel = e => {
        e.preventDefault()
        hideForm()
    }

    return (
        <form className='add-image-form-container' onSubmit={onSubmit}>
                <input className='add-image-form-input'
                    type='text'
                    placeholder='Image Url'
                    required
                    value={imageUrl}
                    onChange={updateImageUrl}
                />
                <button className= 'spot-detail-button add-image-submit-button' type='submit'>Submit</button>
                <button className= 'spot-detail-button add-image-cancel-button' onClick={handleCancel} type='submit'>Cancel</button>

        </form>
    )
}

export default AddImageForm
