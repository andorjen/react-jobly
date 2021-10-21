import { NavLink } from "react-router-dom";
import { useContext } from "react";
import "./NavBar.css";
import CurrUserContext from "./CurrUserContext";
/**Renders NavLinks
 * 
 * Props:
 * - logout() : function to log out curr user
 * 
 * State: 
 * - none
 * 
 * Context:
 * - CurrUserContext
 * 
 * App->NavBar
*/
function NavBar({ logout }) {
    const user = useContext(CurrUserContext);
    return (
        <nav className="NavBar navbar navbar-light bg-light">
            <div>
                <NavLink className="NavBar-logo navbar-brand" exact to="/" >Jobly</NavLink>
            </div>

            {user &&
                <div>
                    <NavLink className="NavBar-link nav-link" exact to="/companies" >Companies</NavLink>
                    <NavLink className="NavBar-link nav-link" exact to="/jobs" >Jobs</NavLink>
                    <NavLink className="NavBar-link nav-link" exact to="/profile" >Profile</NavLink>
                    <NavLink className="NavBar-link nav-link" exact to="/" onClick={logout} >Log out {user.username}</NavLink>
                </div>
            }

            {!user &&
                <div>
                    <NavLink className="NavBar-link nav-link" exact to="/login" >Login</NavLink>
                    <NavLink className="NavBar-link nav-link" exact to="/signup" >Sign Up</NavLink>
                </div>
            }

        </nav>
    );
}

export default NavBar;