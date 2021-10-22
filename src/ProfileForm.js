import { useState, useContext } from "react";
import CurrUserContext from "./CurrUserContext";
import Error from "./Error";
import "./ProfileForm.css";

/**Renders a profile form
 * 
 * Props:
 *  - updateUser(): function that updates user information
 * 
 * State: 
 *  - formData
 *  - errors
 * 
 * Context:
 *  - currUser
 * 
 * Routes -> ProfileForm
 * */
function ProfileForm({ updateUser }) {
    const {
        username,
        firstName,
        lastName,
        email
    } = useContext(CurrUserContext);

    const [formData, setFormData] = useState({
        username,
        firstName,
        lastName,
        email
    });

    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(previousData => ({ ...previousData, [name]: value }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await updateUser(formData);
            setSuccess(true);
        } catch (err) {
            setErrors(err)
        }
    }

    return (
        <div className="background-form">
            <div className="row ProfileForm">
                <h1 className="ProfileForm-title">Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div className="col-6 offset-3">
                        <div className="ProfileForm-username">
                            <label htmlFor="username">Username</label>
                            <input
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="ProfileForm-firstName">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="ProfileForm-lastName">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="ProfileForm-email">
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
                        {success && <p
                            className="success-message">
                            Updated successfully.
                        </p>
                        }
                        <div className="ProfileForm-button">
                            <button className="btn btn-primary mt-2">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfileForm;