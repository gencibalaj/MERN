import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from './context/AuthProvider';

export function Home() {
    const { auth, setAuth } = useContext(AuthContext);
    console.log(auth)
    return auth.token ? (
        <div className="home">
            <h1>Todo Application with React.js and Node.js</h1>
            <div>You are logged in!</div>
            <nav>
                <button className="nav-btn"><Link to="">Home</Link></button>
                <button className="nav-btn"><Link to="todos">Todos</Link></button>
                <button className="nav-btn"><Link to="profile">Profile</Link></button>
            </nav>
            <div className="home">
                {/* Koft kysmet pe kryjm... */}
            </div>
        </div>

    ) : (
        <div className="home">
            <h1>Todo Application with React.js and Node.js</h1>
            <nav>
                <button className="nav-btn"><Link to="">Home</Link></button>
                <button className="nav-btn"><Link to="register">Register</Link></button>
                <button className="nav-btn"><Link to="login">Login</Link></button>
                <button className="nav-btn"><Link to="todos">Todos</Link></button>
                {/* <Link to="register">Register</Link> */}
                {/* <Link to="login">Login</Link> */}
                {/* <Link to="todos">Todos</Link> */}
            </nav>
            <div className="home">
                {/* Koft kysmet pe kryjm... */}
            </div>

        </div>
    );
}
export default Home