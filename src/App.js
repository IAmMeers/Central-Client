
import './App.css';
import mock-data.json;
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import TestPage from './pages/TestPage';
import Burger from './pages/Burger';
import Menupage from './pages/Menupage';


function App() {
  
  return (
    <div className="App">
      {}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestPage/>}/>
          <Route path="/burger" element={<Burger/>}/>
          <Route path="/MenuPage" element={<MenuPage/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

