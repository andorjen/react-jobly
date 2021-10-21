import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from "./NavBar";
import Routes from "./Routes";
import { position } from 'dom-helpers';

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
    <div className="App">

      <BrowserRouter>
        <NavBar />
        <Routes />
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
