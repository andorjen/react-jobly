import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from "./NavBar";
import Routes from "./Routes";
import { useState } from "react";
import CurrUserContext from './CurrUserContext';

/**Wrapper for jobly app
 * 
 * Props:
 * - none
 * 
 * State: 
 * - none
 * 
 * App -> {NavBar, Routes}
*/
function App() {
  const [currUser, setCurrUser] = useState({ username: "Jenny" });
  const [token, setToken] = useState(null);


  return (
    <div className="App">

      <BrowserRouter>
        <CurrUserContext.Provider value={currUser}>
          <NavBar />
          <Routes />
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
