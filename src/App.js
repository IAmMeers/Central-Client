
import './App.css';
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import TestPage from './pages/TestPage';
import Burger from './pages/Burger';

//import config from './config';

//console.log("\n\n\nROOT = " + config.ROOT)



function App() {
  
  return (
    <div className="App">
      {}
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

