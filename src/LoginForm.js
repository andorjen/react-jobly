import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import CurrUserContext from "./CurrUserContext";
import Error from "./Error";
// import "./LoginForm.css"

/**Renders a login form
 * 
 * Props:
 *  - login(): function that authenticates user data
 * 
 * State: 
 *  - formData
 *  - errors
 * 
 * Context:
 *  - currUser
 * 
 * {Routes} -> LoginForm
 * */
function LoginForm({ login }) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState([]);
    const user = useContext(CurrUserContext);

    if (user) return <Redirect to="/" />;

    function handleChange(evt) {
        setFormData(evt.target.value);
    }

    function handleSubmit(evt) {
        try {
            evt.preventDefault();
            login(formData);
        } catch (err) {
            setErrors(err);
        }

    }

    return (
        <div className="row">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className="LoginForm col-6 offset-3">
                    <div className="LoginForm-username">
                        <label htmlFor="username">Username</label>
                        <input
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="LoginForm-password">
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.length > 0 && <Error messages={errors} />}
                    <div className="LoginForm-button">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;