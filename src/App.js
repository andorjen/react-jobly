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
 * - currUser, token
 * 
 * App -> {NavBar, Routes}
*/

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(null);
  // const [errors, setErrors] = useState([]);

  async function login(loginInfo) {
    const token = await JoblyApi.login(loginInfo);
    setToken(token);
    setCurrUser(loginInfo.username);
  }

  async function signUp(userData) {
    console.log("App userData:", { userData });
    const token = await JoblyApi.register(userData);
    setToken(token);
    setCurrUser(userData.username);
  }

  function logout() {
    setCurrUser(null);
    setToken(null);
  }

  async function updateUser(formData) {
    const updatedUser = await JoblyApi.updateUser(currUser.username, formData); //We're going with this design to prevent cases
    setCurrUser(updatedUser);                                                   // where the username in the form is tampered with
  }

  useEffect(function fetchUserOnTokenChange() {
    async function getUserFromApi() {
      const user = await JoblyApi.getUser(currUser);
      setCurrUser(user);
    }
    if (token) getUserFromApi();
  }, [token]);

  return (
    <div className="App">

      <BrowserRouter>
        <CurrUserContext.Provider value={currUser}>
          <NavBar logout={logout} />
          <Routes login={login} register={signUp} updateUser={updateUser} />
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
