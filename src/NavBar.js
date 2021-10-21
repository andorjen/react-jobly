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
        <nav className="NavBar navbar navbar-light bg-light">
            <div>
                <NavLink className="NavBar-logo navbar-brand" exact to="/" >Jobly</NavLink>
            </div>
            <div>
                <NavLink className="NavBar-link nav-link" exact to="/companies" >Companies</NavLink>
                <NavLink className="NavBar-link nav-link" exact to="/jobs" >Jobs</NavLink>
            </div>
        </nav>
    );
}

export default NavBar;