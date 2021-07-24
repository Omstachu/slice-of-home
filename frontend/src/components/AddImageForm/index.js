import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addImageForm, getImage } from "../../store/image";
import './AddImageForm.css'

const AddImageForm = ({spotId, hideForm}) =>{
    const [imageUrl, setImageUrl] = useState('')

    const updateImageUrl = (e) => setImageUrl(e.target.value)

    const dispatch = useDispatch()
    const history = useHistory()

    const image = useSelector(state => state.image)

    useEffect(()=> {
        dispatch(getImage())
    }, [dispatch])

    console.log(image)

    const onSubmit = async(e) => {
        e.preventDefault()
        // console.log('submit form button')
        const payload = {
            spotId,
            url: imageUrl
        }
        await dispatch(addImageForm(payload))
        hideForm()
    }

    const handleCancel = e => {
        e.preventDefault()
        hideForm()
    }

    return (
        <form className='add-image-form-container' onSubmit={onSubmit}>
                <input
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
