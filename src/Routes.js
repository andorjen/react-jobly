import { useContext } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./HomePage";
import CompanyList from "./CompanyList";
import CompanyDetails from "./CompanyDetails";
import Joblist from "./JobList";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ProfileForm from "./ProfileForm";
import CurrUserContext from "./CurrUserContext";

/**Renders Routes
 * 
 * Props:
 *  - login() ,signup() , updateUser(), errors
 * 
 * State: 
 *  - none
 * 
 * Context:
 *  - currUser
 * 
 * App -> Routes -> {
 *              HomePage,
 *              LoginForm,
 *              SignUpForm,
 *              ProfileForm,
 *              CompanyList,
 *              CompanyDetails,
 *              JobList
 *          }
*/

function Routes({ login, signup, updateUser, errors }) {
    const user = useContext(CurrUserContext);

    // const token = localStorage.getItem("token");
    return (
        <>
            {!user &&
                <Switch>
                    <Route exact path="/">
                        <HomePage errors={errors} />
                    </Route>
                    <Route exact path="/login">
                        <LoginForm login={login} />
                    </Route>
                    <Route exact path="/signup">
                        <SignUpForm signup={signup} />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            }
            {user &&
                <Switch>
                    <Route exact path="/">
                        <HomePage errors={errors} />
                    </Route>
                    <Route exact path="/profile">
                        <ProfileForm updateUser={updateUser} />
                    </Route>
                    <Route exact path="/companies">
                        <CompanyList />
                    </Route>
                    <Route exact path="/companies/:handle">
                        <CompanyDetails />
                    </Route>
                    <Route exact path="/jobs">
                        <Joblist />
                    </Route>
                    <Redirect to="/" />
                </Switch>


            }
        </>
    )
}

export default Routes;