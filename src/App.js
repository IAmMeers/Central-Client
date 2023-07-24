
import './App.css';
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import TestPage from './pages/TestPage';
import Burger from './pages/Burger';

const config = require("./config.js");


function App() {
  return (
    <div className="App">
      {/* <h1>MY APP</h1> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestPage/>}/>
          <Route path="/burger" element={<Burger/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
