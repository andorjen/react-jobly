import './HomePage.css';
import { useContext } from "react";
import CurrUserContext from "./CurrUserContext";
import Error from './Error';

/**Renders HomePage
 * 
 * Props:
 *  - errors
 * 
 * State: 
 *  - none
 * 
 * Context:
 *  - currUser
 * 
 * Routes -> HomePage
 * */

function HomePage({ errors }) {
    const user = useContext(CurrUserContext);

    return (
        <div className="HomePage">
            {errors.length > 0 && <Error messages={errors} />}
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