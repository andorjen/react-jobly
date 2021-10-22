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
 *  - login() ,register() , updateUser(), errors
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

function Routes({ login, register, updateUser, errors }) {
    const user = useContext(CurrUserContext);

    return (
        <>
            {!user &&
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/login">
                        <LoginForm login={login} errors={errors} />
                    </Route>
                    <Route exact path="/signup">
                        <SignUpForm register={register} errors={errors} />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            }
            {user &&
                <Switch>
                    <Route exact path="/">
                        <HomePage />
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