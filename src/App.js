import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store.jsx";
import Menu from "./pages/Menu.jsx";
import ManageMenu from "./pages/ManageMenu.jsx";
import Inventory from "./pages/Inventory.jsx";

function App() {
  //console.log(process.env.REACT_APP_SERVER_URL);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Central-Client" element={<Home />} />
          <Route path="Store/:store_id" element={<Store />} />
          <Route path="Menu/:store_id" element={<Menu />} />
          <Route path="ManageMenu/:store_id" element={<ManageMenu />} />
          <Route path="Inventory/:store_id" element={<Inventory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
