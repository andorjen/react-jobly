import { useState } from "react";
import Redirect from 'react-router-dom';
// import "./SignUpForm.css"

/**Renders a sign up form
 * 
 * Props:
 *  - register(): function that signs up a new user
 * 
 * State: 
 *  - formData, errors
 * 
 * Context:
 *  - currUser
 * 
 * {Routes} -> SignUpForm
 * */
function SignUpForm({ login }) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState();
    // const currUser = useContext(currUser);

    // if (currUser) return <Redirect to="/" />;

    function handleChange(evt) {
        setFormData(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        register(formData);
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="SignUpForm">
                    <div className="SignUpForm-username">
                        <label for="username">Username</label>
                        <input
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="SignUpForm-password">
                        <label for="password">Password</label>
                        <input
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="SignUpForm-firstName">
                        <label for="firstName">First Name</label>
                        <input
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="SignUpForm-lastName">
                        <label for="lastName">Last Name</label>
                        <input
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="SignUpForm-email">
                        <label for="email">Email</label>
                        <input
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="SignUpForm-button">
                        <button className="btn text-white">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm;