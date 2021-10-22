import './HomePage.css';
import { useContext } from "react";
import CurrUserContext from "./CurrUserContext";

/**Renders HomePage
 * 
 * Props:
 *  - none
 * 
 * State: 
 *  - none
 * 
 * Context:
 *  - currUser
 * 
 * Routes -> HomePage
 * */

function HomePage() {
    const user = useContext(CurrUserContext);

    return (
        <div className="HomePage">
            <div className="HomePage-content">
                <h1 className="HomePage-title">Jobly</h1>
                <p className="HomePage-description">
                    All the jobs in one, convenient place.
                </p>

                {user && <h2>Welcome Back, {user.username}!</h2>}

            </div>
        </div>
    );
}

export default HomePage;