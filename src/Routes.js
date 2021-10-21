import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./HomePage";
import CompanyList from "./CompanyList";
import CompanyDetails from "./CompanyDetails";
import Joblist from "./JobList";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ProfileForm from "./ProfileForm";

/**Renders Routes
 * 
 * Props:
 *  - login() ,register() , updateUser()
 * 
 * State: 
 *  - none
 * 
 * App -> Routes -> {HomePage, CompanyList, CompanyDetails, JobList}
*/

function Routes({ login, register, updateUser }) {

    return (
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/login">
                <LoginForm login={login} />
            </Route>
            <Route exact path="/signup">
                <SignUpForm register={register} />
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
    )
}

export default Routes;