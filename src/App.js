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

  /**Docstring */
  //Code review: Be very explicit that this function needs username and password
  async function login({ username, password }) {
    try {
      const token = await JoblyApi.login({ username, password });
      localStorage.setItem("token", token);
      setToken(token);
    } catch (err) {
      setErrors(err);
    }
  }
  //Code review: Be very explicit that this function needs {...,...}
  //Code review: Once we fix the token decoding ,don't need setCurrUser in login and signup()

  async function signUp(userData) {
    // console.log("App userData:", { userData });
    try {
      const token = await JoblyApi.register(userData);
      localStorage.setItem("token", token);
      setToken(token);
    } catch (err) {
      setErrors(err);
    }
  }

  function logout() {
    localStorage.setItem("token", null);
    setCurrUser(null);
  }

  async function updateUser(formData) {
    try {
      const updatedUser = await JoblyApi.updateUser(currUser.username, formData); //We're going with this design to prevent cases
      setCurrUser(updatedUser);                                                   // where the username in the form is tampered with 
    } catch (err) {
      setErrors(err);
    }
  }
  //CODE REVIEW: We can get username by decoding the token
  useEffect(function fetchUserOnTokenChange() {
    async function getUserFromApi() {

      const payload = jwt_decode(token);
      try {
        const user = await JoblyApi.getUser(payload.username);
        // console.log("fetch user details", user)
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

// style={{
//   backgroundImage: 'url(/jobly-background.png)',
//   height: "100vh",
//   backgroundAttachment: "fixed"
// }}
export default App;
