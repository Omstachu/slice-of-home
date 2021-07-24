import React, {useState} from "react"
import * as sessionActions from '../../store/session'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './LoginForm.css'

function LoginFormPage () {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])

    if (sessionUser) return (
        <Redirect to ='/' />
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        return dispatch(sessionActions.login({credential, password}))
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors);
            })
    }

    const handleDemoLogin = (e) => {
        e.preventDefault()
        return dispatch(sessionActions.login({credential: 'demo', password: 'password'}))
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors);
            })
    }

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li> )}
            </ul>
            <label className='login-form-label'>
                Username or Email
                <input className="login-form-input"
                    type='text'
                    value={credential}
                    onChange={e=>setCredential(e.target.value)}
                    required
                />
            </label>
            <label className='login-form-label'>
                Password
                <input className="login-form-input"
                    type='password'
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    required
                />
            </label>
            <button className="login-form-button login-form-login-button" type='submit'>Log in</button>
            <button className="login-form-button login-form-demo-button" onClick={handleDemoLogin}>Demo User</button>

        </form>
    )

}

export default LoginFormPage
