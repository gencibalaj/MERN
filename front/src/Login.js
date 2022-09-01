import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from './context/AuthProvider';


async function loginUser(credentials) {
    try {
        const data = {
            "email": credentials.email,
            "password": credentials.password,
        }
        const response = await fetch('http://localhost:8282/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
        })
        return await response.json()
    } catch (error) {
        throw new Error('Could not communicate with the server!')
    }
}


function Login() {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [res, setRes] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [succes, setSucces] = useState(false)

    useEffect(() => {
        if (auth?.token) {
            return navigate('/')
        }
    }, [auth])

    async function handleSubmit(e) {
        e.preventDefault()

        const response = await loginUser({
            email,
            password
        });
        if (response.succes === false) {
            setSucces(false)
        }
        setSucces(true)
        let token = await response.token
        setRes(response)
        localStorage.setItem("token", token)
        setAuth({ token })
    }

    return !auth?.token ? (
        <>
            <nav className='nav-bar'>
                <button className='nav-btn'><Link to="/register" >Sign Up</Link></button>
                <button className='nav-btn'><Link to="/" >Home</Link></button>

            </nav>
            <div className="Login">
                <form className="form" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <label>Email</label>
                    <input type="text" onChange={(e) => { setEmail(e.target.value) }} />
                    {res.message && res.message.email && <p className='error'>{res.message.email}</p>}
                    <label>Password</label>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} />
                    {res.message && res.message.password && <p className='error'>{res.message.password}</p>}
                    {succes && <p className='error'>Incorrect username or password!</p>}

                    <button className='reg-Button' type='submit'>Login</button>

                </form>
            </div>
        </>
    ) : (
        <>
            <nav className='nav-bar'>
                <button className='nav-btn'><Link to="/register" >Sign Up</Link></button>
                <button className='nav-btn'> <Link to="/todos" >Todos</Link></button>
                <button className='nav-btn'><Link to="/" >Home</Link></button>

            </nav>
        </>
    )
}

export default Login;