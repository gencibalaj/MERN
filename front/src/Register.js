import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import AuthContext from './context/AuthProvider'

function Register() {
    const { auth } = useContext(AuthContext)
    const [emailReg, setEmailReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState("")
    // const [submited, setSubmited] = useState(false)
    const [res, setRes] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (auth?.token) {
            return navigate('/')
        }
    }, [auth])

    async function submit(e) {
        e.preventDefault()
        const data = {
            "email": emailReg,
            "first_name": firstName,
            "last_name": lastName,
            "password": passwordReg,
            "passwordConfirmation": passwordConfirm,
            "birthday": birthday,
        }
        try {
            const response = await fetch('http://localhost:8282/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            const res = await response.json()
            setRes(res)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <nav className='nav-bar'>
                <button className='nav-btn'><Link to="/login" >Login</Link></button>
                <button className='nav-btn'> <Link to="/todos" >Todos</Link></button>
                <button className='nav-btn'><Link to="/" >Home</Link></button>
            </nav>
            <form className="Register" onSubmit={submit}>
                <div className="form">
                    <h1>Register</h1>

                    <label>First Name</label>
                    <input type="text" placeholder='type your first name' onChange={(e) => { setFirstName(e.target.value) }} />
                    {res.message && res.message.first_name && <p className='error'>{res.message.first_name}</p>}

                    <label>Last Name</label>
                    <input type="text" placeholder='type your last name' onChange={(e) => { setLastName(e.target.value) }} />
                    {res.message && res.message.last_name && <p className='error'>{res.message.last_name}</p>}

                    <label>Email</label>
                    <input type="text" placeholder='type your email' onChange={(e) => { setEmailReg(e.target.value) }} />
                    {res.message && res.message.email && <p className='error'>{res.message.email}</p>}
                    {res.success === false && <p className='error'>{res.errors}</p>}

                    <label>Password</label>
                    <input type="password" placeholder='type your password' onChange={(e) => { setPasswordReg(e.target.value) }} />
                    {res.message && res.message.password && <p className='error'>{res.message.password}</p>}

                    <label>Password Confirm</label>
                    <input type="password" placeholder='confirm your password' onChange={(e) => { setPasswordConfirm(e.target.value) }} />
                    {res.message && res.message.passwordConfirmation && <p className='error'>{res.message.passwordConfirmation}</p>}

                    <label>Birthday</label>
                    <input type="date" placeholder='dd/mm/yyyy' onChange={(e) => { setBirthday(e.target.value) }} />
                    {res.message && res.message.birthday && <p className='error'>{res.message.birthday}</p>}
                    {res.success === true && <p className='success'>{res.message}</p>}
                    <button className='reg-Button' type="submit">Register</button>
                </div>
            </form>
        </>

    );
}



export default Register;