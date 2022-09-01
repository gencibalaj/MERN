import AuthContext from './context/AuthProvider';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom'

async function getProfile(token) {
    try {
        const response = await fetch('http://localhost:8282/api/profile/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
        return await response.json()
    } catch (error) {
        throw new Error('Could not communicate with the server!')
    }
}

function Profile() {
    const { auth, setAuth } = useContext(AuthContext);
    const [profile, setProfile] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            if (!auth.token) {
                return navigate("/login")
            }
            const response = await getProfile(auth.token)
            setProfile(response.profile)
        })()
    }, [])

    return (
        <>
            <nav className='nav-bar'>
                <button className='nav-btn'><Link to="/" >Home</Link></button>
                <button className='nav-btn'> <Link to="/todos" >Todos</Link></button>
            </nav>
            <div className='profile'>User logged in: </div>
            {profile?.email && <div className='email'>{profile.email}</div>}
        </>
    )
}

export default Profile