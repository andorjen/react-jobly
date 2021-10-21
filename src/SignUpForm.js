import { useState, useContext } from "react";
import { Redirect } from 'react-router-dom';
import CurrUserContext from "./CurrUserContext";
import Error from "./Error";
// import "./SignUpForm.css"

/**Renders a sign up form
 * 
 * Props:
 *  - register(): function that signs up a new user
 * 
 * State: 
 *  - formData
 *  - errors
 * 
 * Context:
 *  - currUser
 * 
 * {Routes} -> SignUpForm
 * */
function SignUpForm({ register }) {
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
            register(formData);
        }
        catch (err) {
            setErrors(err)
        }

    }

    return (
        <div className="row">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="SignUpForm col-6 offset-3">
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
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}



export default SignUpForm;