import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from "./NavBar";
import Routes from "./Routes";
import { useState, useEffect } from "react";
import CurrUserContext from './CurrUserContext';
import JoblyApi from './api';
import jwt_decode from "jwt-decode";

/**Wrapper for jobly app
 * 
 * Props:
 * - none
 * 
 * State: 
 * - currUser
 * - token
 * - errors
 * - isLoading
 * 
 * App -> {NavBar, Routes}
*/
function App() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /** function that takes {username, password],
   * makes api call to login user,
   * get token from login and set token on state and localStorage
   */
  async function login({ username, password }) {
    const token = await JoblyApi.login({ username, password });
    localStorage.setItem("token", token);
    setToken(token);
  }


  /** function that takes { username, password, firstName, lastName, email }
   * makes api call to sign up a new user,
   * get token from signup and set token on state and localStorage
   */
  async function signUp({ username, password, firstName, lastName, email }) {
    const token = await JoblyApi.signup(
      { username, password, firstName, lastName, email });
    localStorage.setItem("token", token);
    setToken(token);
  }

  /** function to log out a user, remove token from localStorage,
   * and set currUser to null */

  function logout() {
    localStorage.removeItem("token");
    setCurrUser(null);
    setToken(null);
  }

  /** function that takes { username, firstName, lastName, email  }
    * makes api call to update information for a user
    * set currUser to be the updated user info
    */

  async function updateUser({ username, firstName, lastName, email }) {
    const updatedUser = await JoblyApi.updateUser(
      { username, firstName, lastName, email });
    setCurrUser(previousData => ({
      ...previousData,
      ...updatedUser
    }));
  }

  useEffect(function fetchUserOnTokenChange() {
    /**function that takes token from state and decode the username
     * makes api call to get details for user and set currUser 
     */
    async function getUserFromApi() {
      const payload = jwt_decode(token);
      try {
        const user = await JoblyApi.getUser(payload.username);
        setCurrUser(user);
        setIsLoading(false);
      } catch (err) {
        setErrors(err);
      }
    }
    if (token) {
      getUserFromApi();
    }
    else {
      setIsLoading(false);
    }
  }, [token]);

  //Code review: need a state for isLoading for HODLing;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="App">
      <BrowserRouter>
        <CurrUserContext.Provider value={currUser}>
          <NavBar logout={logout} />
          <Routes
            login={login}
            signup={signUp}
            updateUser={updateUser}
            errors={errors}
          />
        </CurrUserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
