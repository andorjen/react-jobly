import { NavLink } from "react-router-dom";
import "./NavBar.css";
/**Renders NavLinks
 * 
 * Props:
 * - none
 * 
 * State: 
 * - none
 * 
 * App->NavBar
*/
function NavBar() {
    return (
        <nav className="NavBar">
            <NavLink className="NavBar-logo" exact to="/" >Jobly</NavLink>
            <NavLink className="NavBar-link" exact to="/companies" >Companies</NavLink>
            <NavLink className="NavBar-link" exact to="/jobs" >Jobs</NavLink>
        </nav>
    );
}

export default NavBar;