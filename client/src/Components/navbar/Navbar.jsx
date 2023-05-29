import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
      dispatch({type : "LOGOUT"});
      navigate('/');
    }


    return (
        <div className="navbar">
            <div className="navContainer">
                <Link
                    to="/"
                    style={{ color: "inherit", textDecoration: "none" }}
                >
                    <span className="logo">Vert Booking</span>
                </Link>
                {user ? (
                    <button className="navButton" onClick={handleLogout}>Logout</button>
                ) : (
                    <div className="navItems">
                        <button className="navButton">Register</button>
                        <button className="navButton" onClick={() => navigate('/login')}>Login</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
