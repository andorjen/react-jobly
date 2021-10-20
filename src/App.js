import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from "./NavBar";
import Routes from "./Routes";

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
  return (
    <div className="App" style={{ backgroundImage: 'url(/jobly-background.png)', height: "100vh" }}>
      <BrowserRouter>
        <NavBar />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
