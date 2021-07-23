import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImageForm } from "../../store/image";

const AddImageForm = ({spotId, hideForm}) =>{
    const [imageUrl, setImageUrl] = useState('')
    const updateImageUrl = (e) => setImageUrl(e.target.value)

    const dispatch = useDispatch()

    const onSubmit = async(e) => {
        e.preventDefault()

        console.log('submit form button')

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
        <form onSubmit={onSubmit}>
                <input
                    type='text'
                    placeholder='Image Url'
                    required
                    value={imageUrl}
                    onChange={updateImageUrl}
                />
                <button className= 'spot-detail-button' type='submit'>Submit</button>
                <button className= 'spot-detail-button' onClick={handleCancel} type='submit'>Cancel</button>

        </form>
    )
}

export default AddImageForm
