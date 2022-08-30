import { useState, useContext, useEffect } from "react";
import AuthContext from "./context/AuthProvider";
import { Navigate, useNavigate, Link } from 'react-router-dom'


async function getTodos(token) {
    try {

        const response = await fetch('http://localhost:8282/api/todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
        return await response.json()
    } catch (error) {
        throw new Error('Could not communicate with the server!')
    }
}

function logOut() {
    localStorage.removeItem("token")
    window.location.reload(false)
}

function Todos() {
    const { auth } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState()
    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            if (!auth.token || auth.token === undefined) {
                // window.alert('In order to view todos you should Login!')
                return navigate("/login")
            }
            const todos = await getTodos(auth.token)
            // const todos2 = await getTodos(token);
            setTodos(todos.todos);
            setLoading(false);
        })()
    }, [auth])

    async function deleteTodo(todoToRemove) {
        try {
            const response = await fetch(`http://localhost:8282/api/todos/remove/${todoToRemove}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token,
                }
            })
            let indexToRemove = todos.indexOf(todoToRemove)
            let result = todos.filter((data, idx) => idx !== indexToRemove)
            setTodos(result)
            // window.location.reload(true)
            // setTodos(todos.pop(todo))
            return await response.json()
        } catch (error) {
            throw new Error('Could not communicate with the server!')
        }
    }

    async function add(newTodo) {
        let todo = (newTodo.charAt(0).toUpperCase() + newTodo.slice(1).toLowerCase())
        try {
            const response = await fetch(`http://localhost:8282/api/todos/add/${todo}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token,
                }
            })

            // setTodos(todos.pop(todo))
            let newList = [...todos, todo]
            setTodos(newList)
            // console.log(todos)
            // window.location.reload(false)
            return await response.json()
        } catch (error) {
            throw new Error('Could not communicate with the server!')
        }
    }

    async function update(todo, newTodo) {
        let newtodo = (newTodo.charAt(0).toUpperCase() + newTodo.slice(1).toLowerCase())
        try {
            const response = await fetch(`http://localhost:8282/api/todos/update/${todo}/${newTodo}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token,
                }
            })
            let newList = [...todos, todo]
            setTodos(newList)
            return await response.json()
        } catch (error) {
            throw new Error('Could not communicate with the server!')
        }
    }

    return !loading ? (
        <>
            <nav className='nav-bar'>
                <button className='nav-btn'><Link to="/" >Home</Link></button>
                <button className="nav-btn" onClick={logOut}>Log Out</button>

                {/* <button><Navigate to="">Home</Navigate></button> */}

            </nav>
            <h1 className="todo-text"> Your todo list: </h1>

            <ul className="todos">
                {
                    todos && todos.map((t, i) => {
                        return (
                            <>
                                <li key={i.toString()}>

                                    <span className="item" >{t}</span>
                                    <button className="delete-btn" onClick={() => deleteTodo(t)}>Remove</button>
                                    {/* <button className="edit-btn" onClick={() => update(t)}>Remove</button> */}
                                </li>
                            </>
                        )
                    })
                }
            </ul>
            <div className="add">
                <input type="text" placeholder='type todo' onChange={(e) => { setNewTodo(e.target.value) }} />
                <button className="add-btn" onClick={() => newTodo ? add(newTodo) : alert("Todo input should be filled!")}>Add new Todo</button>
                {/* <button onClick={() => handleEditClick(todo)}>Edit</button> */}
            </div>
            {/* <div className="get">
                    <button className="get-btn" onClick={()=> document.getElementsByClassName('nextTodo')}>Get next Todo</button>
                    <div className="nextTodo" style={{display: 'none'}}>Your next todo is: {todos.shift()}</div>
                </div> */}
        </>

    ) : <h2>loading</h2>;

}
export default Todos