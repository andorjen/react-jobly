import { useState } from "react";
import Error from "./Error";
import "./SignUpForm.css"

/**Renders a sign up form
 * 
 * Props:
 *  - register(): function that signs up a new user
 * 
 * State: 
 *  - formData
 *  - errors
 * 
 * Routes -> SignUpForm
 * */
function SignUpForm({ register }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });
    const [errors, setErrors] = useState([]);

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(previousData => ({ ...previousData, [name]: value }));
    }

    async function handleSubmit(evt) {
        try {
            evt.preventDefault();
            await register(formData);
        } catch (err) {
            setErrors(err)
        }
    }

    return (
        <div className="background-form">
            <div className="row SignUpForm">
                <h1 className="SignUpForm-title">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="col-6 offset-3">
                        <div className="SignUpForm-username">
                            <label htmlFor="username">Username</label>
                            <input
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="SignUpForm-password">
                            <label htmlFor="password">Password</label>
                            <input
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="SignUpForm-firstName">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="SignUpForm-lastName">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="SignUpForm-email">
                            <label htmlFor="email">Email</label>
                            <input
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.length > 0 && <Error messages={errors} />}
                        <div className="SignUpForm-button">
                            <button className="btn btn-primary mt-2">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm;