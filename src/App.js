
import './App.css';
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import TestPage from './pages/TestPage';
import Store from './pages/Store.jsx';


function App() {
  
  return (
    <div className="App">
      {}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestPage/>}/>
          <Route path="/Store" element={<Store/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

