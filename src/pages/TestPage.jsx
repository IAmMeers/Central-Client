/*
 * Kenneth Mendoza
 */

import React, { useState, useEffect } from 'react';
import './TestPage.jsx';
//import logoImage from './src/CentralRestLogo.png';
import { Link } from 'react-router-dom';


//const logoImage = require(__dirname + '\\assets\\CentralRestLogo.png');



const TestPage = () => {

  const [data, setData] = useState(null);

  console.log("TEST PAGE LAUNCH");

  //Code is getting executed twice?
  useEffect(() => {
    fetch('http://127.0.0.1:5000/Inventory?storeID=SID1')
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);


  const [selectedStore, setSelectedStore] = useState('');
  const [stores, setStores] = useState([
    { id: 'store1', name: 'Store 1' },
    { id: 'store2', name: 'Store 2' },
  ]);

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };

  const addNewStore = (newStoreName) => {
    const newStore = {
      id: `store${stores.length + 1}`,
      name: newStoreName,
    };
    setStores([...stores, newStore]);
  };

  const [newStoreName, setNewStoreName] = useState('');

  const handleNewStoreNameChange = (event) => {
    setNewStoreName(event.target.value);
  };

  const handleAddStore = (event) => {

    

    console.log("Adding new store: " + newStoreName);
    // fetch('http://localhost:5000/Inventory?storeID=SID1')
    //      .then((response) => response.json())
    //      .then((data) => {
    //         console.log(data);
    //      })
    //      .catch((err) => {
    //         console.log(err.message);
    //      });
   

    event.preventDefault();
    addNewStore(newStoreName);
    setNewStoreName('');
  };

  return (
    <div className="body-background">
      <header>
        {/* <img src={logoImage} alt="Logo" className="resize-logo" /> */}
      </header>
      <div className="main-content">
        <label htmlFor="stores-dropdown" className="select-label">
          Select a store:
        </label>
        <br />
        <select
          id="stores-dropdown"
          className="dropdown"
          value={selectedStore}
          onChange={handleStoreChange}
        >
          <option value="">Select a store</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
        <p> </p>
        <form onSubmit={handleAddStore}>
          <label htmlFor="new-store-name">Add a new store:  </label>
          <input
            type="text"
            id="new-store-name"
            value={newStoreName}
            onChange={handleNewStoreNameChange}
          />
          <button type="submit">Add</button>
        </form>
        <p> </p>
        <Link to={`/${selectedStore}`}>Go to Selected Store</Link>
        <p> </p>
      </div>
    </div>
  );
};



export default TestPage;
  
