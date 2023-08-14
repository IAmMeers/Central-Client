
import './App.css';
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import TestPage from './pages/TestPage';
import Store from './pages/Store.jsx';
import Menu from './pages/Menu';


function App() {
  
  return (
    <div className="App">
      {}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestPage/>}/>
          <Route path="/Store" element={<Store/>}/>
          <Route path="/Menu" element={<Menu/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

