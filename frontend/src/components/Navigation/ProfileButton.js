import React, {useState, useEffect} from "react"
import {useDispatch} from 'react-redux'
import * as sessionActions from '../../store/session'
import './Navigation.css'

function ProfileButton ({user}) {
 const dispatch = useDispatch()
 const [showMenu, setShowMenu] = useState(false)

 const openMenu = () => {
     if (showMenu) return;
     setShowMenu(true)
 }

 useEffect(() => {
     if (!showMenu) return;

     const closeMenu = () => {
         setShowMenu(false)
     }

     document.addEventListener('click', closeMenu)
     return () => document.removeEventListener('click', closeMenu)
 }, [showMenu])

 const logout = (e) => {
     e.preventDefault();
     dispatch(sessionActions.logout())
 }

return (
    <>
        <button className='profile-button' onClick={openMenu}>
            <i className="fas fa-user-circle " />
        </button>
        {showMenu && (
            <ul className='profile-dropdown'>
                <div className='profile-dropdown-div profile-dropdown-user'>{user.username}</div>
                <div className='profile-dropdown-div profile-dropdown-email'>{user.email}</div>
                <div className='profile-dropdown-div'>
                    <button className='profile-dropdown-logout-button' onClick={logout}>Log Out</button>
                </div>
            </ul>
        )}

    </>
)

}

export default ProfileButton
