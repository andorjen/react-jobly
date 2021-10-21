import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./HomePage";
import CompanyList from "./CompanyList";
import CompanyDetails from "./CompanyDetails";
import Joblist from "./JobList";

/**Renders Routes
 * 
 * Props:
 *  - none
 * 
 * State: 
 *  - none
 * 
 * App -> Routes -> {HomePage, CompanyList, CompanyDetails, JobList}
*/

function Routes() {

    return (
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/login">
                <LoginForm />
            </Route>
            <Route exact path="/signup">
                <SignUpForm />
            </Route>
            <Route exact path="/profile">
                <ProfileForm />
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