import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpotForm, getSpot } from "../../store/spot";
import './CreateSpotForm.css'

const CreateSpotForm = () => {
    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")

    const sessionUser = useSelector(state => state.session)

    const history = useHistory()

    if(!sessionUser?.user?.id){
        history.push('/login')
    }
    const id = sessionUser?.user?.id

    const updateName = e => setName(e.target.value)
    const updateCountry = e => setCountry(e.target.value)
    const updateCity = e => setCity(e.target.value)
    const updateUrl = e => setUrl(e.target.value)
    const updateDescription = e => setDescription(e.target.value)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpot())
    },[dispatch])

    const state = useSelector((state) => state)

    const onSubmit = async(e) => {
        e.preventDefault();

        const payload = {
            userId: id,
            cityId: 1,
            name,
            country,
            address: '',
            description,
            url,
        }

        await dispatch(createSpotForm(payload))
        const newId = state.spot.list[0].id + 1
        history.push(`/spots/${newId}`)
    }

    return (
        <div className="create-spot-form-container">
            <form className='create-spot-form' onSubmit={onSubmit}>
                <ul>
                </ul>
                <input className="create-spot-form-input"
                    type='text'
                    placeholder='Name'
                    required
                    value={name}
                    onChange={updateName}
                    />
                <input className="create-spot-form-input"
                    type='text'
                    placeholder='Country'
                    required
                    value={country}
                    onChange={updateCountry}
                    />
                <input className="create-spot-form-input"
                    type='text'
                    placeholder='City'
                    required
                    value={city}
                    onChange={updateCity}
                    />
                <input className="create-spot-form-input"
                    type='text'
                    placeholder='Description'
                    required
                    value={description}
                    onChange={updateDescription}
                    />
                <input className="create-spot-form-input"
                    type='text'
                    placeholder='Url to Image'
                    required
                    value={url}
                    onChange={updateUrl}
                    />
                <button className="submit-button" type="submit">Submit!</button>
                <div>
                    {(url.length > 0) && (
                     <img className="create-spot-preview" src={url} alt="preview"/>
                    ) }
                </div>
            </form>
        </div>
    )
}

export default CreateSpotForm
