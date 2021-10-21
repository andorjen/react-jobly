import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from "./NavBar";
import Routes from "./Routes";
import { useState, useEffect } from "react";
import CurrUserContext from './CurrUserContext';
import JoblyApi from './api';

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
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState([]);

  // console.log('APP', { currUser, token });

  async function login(loginInfo) {
    try {
      const token = await JoblyApi.login(loginInfo);
      setCurrUser({ username: loginInfo.username });
      setToken(token);
    } catch (err) {
      setErrors(err);
    }
  }

  async function signUp(userData) {
    // console.log("App userData:", { userData });
    try {
      const token = await JoblyApi.register(userData);
      setCurrUser({ username: userData.username });
      setToken(token);
    } catch (err) {
      setErrors(err);
    }
  }

  function logout() {
    setCurrUser(null);
    setToken(null);
  }

  async function updateUser(formData) {
    try {
      const updatedUser = await JoblyApi.updateUser(currUser.username, formData); //We're going with this design to prevent cases
      setCurrUser(updatedUser);                                                   // where the username in the form is tampered with 
    } catch (err) {
      setErrors(err);
    }
  }

  useEffect(function fetchUserOnTokenChange() {
    async function getUserFromApi() {
      try {
        const user = await JoblyApi.getUser(currUser.username);
        // console.log("fetch user details", user)
        setCurrUser(user);
      } catch (err) {
        setErrors(err);
      }
    }
    if (currUser) getUserFromApi();
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
