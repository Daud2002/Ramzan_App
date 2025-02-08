import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function RefreshHandler({ setisAuthenticate }) {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setisAuthenticate(true);
                }
        else (
            setisAuthenticate(false)
        )
    }, [location, navigate, setisAuthenticate])

    return (
        null
    )
}
