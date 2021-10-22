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
 * 
 * App -> {NavBar, Routes}
*/
function App() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [errors, setErrors] = useState([]);

  // console.log('APP', { currUser, token });

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
   * makes api call to register a new user,
   * get token from signup and set token on state and localStorage
   */

  async function signUp({ username, password, firstName, lastName, email }) {
    // console.log("App userData:", { userData });
    const token = await JoblyApi.register({ username, password, firstName, lastName, email });
    localStorage.setItem("token", token);
    setToken(token);
  }

  /** function to log out a user, remove token from localStorage, and set currUser to null */

  function logout() {
    localStorage.removeItem("token");
    setCurrUser(null);
  }

  /** function that takes { username, firstName, lastName, password, email  }
    * makes api call to update information for a user
    * set currUser to be the updated user info
    */

  async function updateUser({ username, firstName, lastName, password, email }) {
    try {
      const updatedUser = await JoblyApi.updateUser(
        { username, firstName, lastName, password, email });
      setCurrUser(updatedUser);
    } catch (err) {
      setErrors(err);
    }
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
      } catch (err) {
        setErrors(err);
      }
    }
    if (token) getUserFromApi();
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>

        <CurrUserContext.Provider value={currUser}>
          <NavBar logout={logout} />
          <Routes login={login} register={signUp} updateUser={updateUser} errors={errors} />
        </CurrUserContext.Provider>

      </BrowserRouter>
    </div>
  );
}


export default App;
