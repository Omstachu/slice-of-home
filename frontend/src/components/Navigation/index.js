import React, {useState} from "react"
import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import ProfileButton from "./ProfileButton"
import './Navigation.css'

function Navigation ({isLoaded}) {
    const sessionUser = useSelector(state => state.session.user)

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        )
    } else {
        sessionLinks = (
            <>
                    <div className="nav-links-container">
                        <NavLink className="Navbar-link" to='/login'>Log in</NavLink>
                        <NavLink className="Navbar-link" to='/signup'>Sign Up</NavLink>
                    </div>
            </>

        )
    }

    return (
            <div className="nav-links-container">
                <NavLink className="Navbar-link" exact to='/'>Home</NavLink>
                <NavLink className="Navbar-link" to='/spots'>Spots</NavLink>
                <NavLink className="Navbar-link" to='/spots/new'>NewSpot</NavLink>
                {isLoaded && sessionLinks}
            </div>
    );
}

export default Navigation
