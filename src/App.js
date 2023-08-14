
import './App.css';
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Home from './pages/Home';
import Store from './pages/Store.jsx';
import Menu from './pages/Menu.jsx';
import Inventory from './pages/Inventory.jsx';


function App() {
  
  return (
    <div className="App">
      {}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Store" element={<Store/>}/>
          <Route path="/Menu" element={<Menu/>}/>
          <Route path="/Inventory" element={<Inventory/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

