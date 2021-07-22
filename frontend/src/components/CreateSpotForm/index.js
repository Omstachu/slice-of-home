import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpotForm, getSpot } from "../../store/spot";

const CreateSpotForm = () => {
    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    const [region, setRegion] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [validationErrors, setValidationErrors] = useState([])

    const sessionUser = useSelector(state => state.session)
    const id = sessionUser.user.id


    const updateName = e => setName(e.target.value)
    const updateCountry = e => setCountry(e.target.value)
    const updateRegion = e => setRegion(e.target.value)
    const updateCity = e => setCity(e.target.value)
    const updateAddress = e => setAddress(e.target.value)
    const updateUrl = e => setUrl(e.target.value)
    const updateDescription = e => setDescription(e.target.value)

    const dispatch = useDispatch()
    const history = useHistory()

    // const largestSpot = useSelector(state => {
    //     return state.spot?.list[0]?.id + 1
    // })

    // const spot = useSelector(state => {
    //     return state.spot
    // })
    // console.log(largestSpot)
    // console.log(spot)


    useEffect(() => {
        dispatch(getSpot())
    },[dispatch])

    const onSubmit = async(e) => {
        e.preventDefault();

        const payload = {
            userId: id,
            cityId: 1,
            name,
            country,
            address,
            description,
            url,
        }

        const res = await dispatch(createSpotForm(payload))

        let createdSpot;
        if (createdSpot){
            history.push('/')
        }
    }


    return (
        <div>
            <form className='create-spot-form' onSubmit={onSubmit}>
                <ul>
                </ul>
                <input
                    type='text'
                    placeholder='Name'
                    required
                    value={name}
                    onChange={updateName}
                    />
                <input
                    type='text'
                    placeholder='Country'
                    required
                    value={country}
                    onChange={updateCountry}
                    />
                {/* <input
                    type='text'
                    placeholder='Region'
                    required
                    value={region}
                    onChange={updateRegion}
                    /> */}
                <input
                    type='text'
                    placeholder='City'
                    required
                    value={city}
                    onChange={updateCity}
                    />
                {/* <input
                    type='text'
                    placeholder='Address'
                    required
                    value={address}
                    onChange={updateAddress}
                    /> */}
                <input
                    type='text'
                    placeholder='Description'
                    required
                    value={description}
                    onChange={updateDescription}
                    />
                <input
                    type='text'
                    placeholder='Url to Image'
                    required
                    value={url}
                    onChange={updateUrl}
                    />
                <button type="submit">Submit!</button>
                <div>
                    <img src={url} alt="preview"/>
                </div>
            </form>
        </div>
    )
}

export default CreateSpotForm
