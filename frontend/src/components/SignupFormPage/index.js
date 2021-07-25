import React, {useState} from "react"
import * as sessionActions from '../../store/session'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import isEmail from 'validator/es/lib/isEmail'

import './SignupForm.css'

function SignupFormPage () {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState([])

    if (sessionUser){
        return (
            <Redirect to='/' />
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = []
        if (!isEmail(email)) {
            errors.push('Please provide a valid email')
        }
        if (password !== confirmPassword) {
            errors.push('Password fields must match')
        }
        if (errors.length === 0) {
            setErrors([])
            return dispatch(sessionActions.signup({username, email, password }))
                .catch(async (res) => {
                    const data = await res.json()
                    if (data && data.errors) setErrors(data.errors)
                })
        }
        return setErrors(errors)
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => {
                    return <li className='signup-form-error' key={idx}>{error}</li>
                })}
            </ul>
            <label className="login-form-label">
                Username
                <input className="login-form-input"
                type='text'
                value={username}
                onChange={e=>setUsername(e.target.value)}
                required
                />
            </label>
            <label className="login-form-label">
                Email
                <input className="login-form-input"
                type='text'
                value={email}
                onChange={e=>setEmail(e.target.value)}
                required
                />
            </label>
            <label className="login-form-label">
                Password
                <input className="login-form-input"
                type='password'
                value={password}
                onChange={e=>setPassword(e.target.value)}
                required
                />
            </label>
            <label className="login-form-label">
                Confirm Password
                <input className="login-form-input"
                type='password'
                value={confirmPassword}
                onChange={e=>setConfirmPassword(e.target.value)}
                required
                />
            </label>
            <button className='login-form-login-button login-form-button' type="submit">Sign Up</button>
        </form>
    )
}

export default SignupFormPage
