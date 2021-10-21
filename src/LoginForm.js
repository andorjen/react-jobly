import { useState } from "react";
// import "./LoginForm.css"

/**Renders a login form
 * 
 * Props:
 *  - login(): function that authenticates user data
 * 
 * State: 
 *  - formData, currUser
 * 
 * {Routes} -> LoginForm
 * */
function LoginForm({ login }) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState();
    const currUser = useContext(currUser);

    if (currUser) return <Redirect to="/" />;

    function handleChange(evt) {
        setFormData(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        login(formData);
    }

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className="LoginForm">
                    <div className="LoginForm-username">
                        <label for="username">Username</label>
                        <input
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="LoginForm-password">
                        <label for="password">Password</label>
                        <input
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="LoginForm-button">
                        <button className="btn text-white">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;