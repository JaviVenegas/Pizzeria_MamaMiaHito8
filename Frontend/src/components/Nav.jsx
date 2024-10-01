// Nav.jsx
import { NavLink } from 'react-router-dom';
import { useContext } from 'react'; 
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';

const Nav = () => {
    const { total } = useContext(CartContext);
    const { user, logOut } = useContext(UserContext);
    const token = user?.token || localStorage.getItem("token");

    const isAuthenticated = !!token;

    const setActiveClass = ({ isActive }) => (isActive ? "linkActivo" : "linkInactivo");

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
            <NavLink className="navbar-brand p-1" to="/">Pizzeria Mamma Mia</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className={setActiveClass} to="/" end>🍕 Home</NavLink>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <NavLink className={setActiveClass} to="/profile">👤 Profile</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={setActiveClass} to="/" onClick={logOut}>
                                    🔐 Logout
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <NavLink className={setActiveClass} to="/login">🔐 Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={setActiveClass} to="/register">🔐 Register</NavLink>
                            </li>
                        </>
                    )}
                </ul> 
                <span>
                    <NavLink className={setActiveClass} to="/cart">🛒 Cart: ${total.toLocaleString()}</NavLink>
                </span>
            </div>
        </nav>
    );
};

export default Nav;

