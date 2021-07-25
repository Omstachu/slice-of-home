import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { getSpot, editSpot } from "../../store/spot";
import './EditSpotForm.css'

const EditSpotForm = ({spotId, hideForm}) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const updateName = e => setName(e.target.value)
    const updateDescription = e => setDescription(e.target.value)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpot())
    },[dispatch])

    const onSubmit = async(e) => {
        e.preventDefault();

        const payload = {
            name,
            description,
        }

        await dispatch(editSpot(spotId, payload))
        hideForm()
    }

    const handleCancel = e => {
        e.preventDefault()
        hideForm()
    }


    return (
            <form className='edit-spot-form-container' onSubmit={onSubmit}>
                <ul></ul>
                <input className='edit-spot-form-input'
                    type='text'
                    placeholder='Name'
                    required
                    value={name}
                    onChange={updateName}
                    />
                <input className='edit-spot-form-input'
                    type='text'
                    placeholder='Description'
                    required
                    value={description}
                    onChange={updateDescription}
                    />
                <button className= 'spot-detail-button edit-spot-submit-button' type='submit'>Submit</button>
                <button className= 'spot-detail-button edit-spot-cancel-button' onClick={handleCancel}>Cancel</button>
            </form>
    )
}

export default EditSpotForm
