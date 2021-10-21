import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import CurrUserContext from "./CurrUserContext";
import Error from "./Error";
import "./LoginForm.css"

/**Renders a login form
 * 
 * Props:
 *  - login(): function that authenticates user data
 *  - errors
 * 
 * State: 
 *  - formData
 * 
 * Context:
 *  - currUser
 * 
 * {Routes} -> LoginForm
 * */

function LoginForm({ login, errors }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    // const [errors, setErrors] = useState([]);
    const user = useContext(CurrUserContext);

    if (user) return <Redirect to="/" />;

    function handleChange(evt) {
        const { name, value } = evt.target
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        login(formData);
    }

    return (
        <div className="background-form">
            <div className="row LoginForm">
                <h1 className="pt-3 LoginForm-title">Log In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="col-6 offset-3 pt-3">
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
                            <button className="btn btn-primary mt-2">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;