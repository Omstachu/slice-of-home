import { useState, useEffect } from "react";
import { useParams } from "react-router";

const CreateSpotForm = () => {
    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    const [region, setRegion] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [validationErrors, setValidationErrors] = useState([])


    const updateName = e => setName(e.target.value)
    const updateCountry = e => setCountry(e.target.value)
    const updateRegion = e => setRegion(e.target.value)
    const updateAddress = e => setAddress(e.target.value)
    const updateDescription = e => setDescription(e.target.value)

    return (
        <div>
            <form className='create-spot-form'>
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
                <input
                    type='text'
                    placeholder='Region'
                    required
                    value={region}
                    onChange={updateRegion}
                    />
                <input
                    type='text'
                    placeholder='Address'
                    required
                    value={address}
                    onChange={updateAddress}
                    />
                <input
                    type='text'
                    placeholder='Description'
                    required
                    value={description}
                    onChange={updateDescription}
                    />
                <button type="submit">Submit!</button>

            </form>
        </div>
    )
}

export default CreateSpotForm
