/*
 * Kenneth Mendoza
 */

import React, { useState, useEffect } from 'react';
import './TestPage.jsx'; 
import logoImage from '../assets/CentralRestLogo.png';
import { Link } from 'react-router-dom';


// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const TestPage = () => {
  // const [data, setData] = useState([]);

  const [selectedStore, setSelectedStore] = useState('');
  const [stores, setStores] = useState([
    { id: 'store1', name: 'Store 1' },
    { id: 'store2', name: 'Store 2' },
  ]);

  // useEffect(() => {
  //   fetch(SERVER_URL + '/Inventory?store_id=SID1')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setData(data); // Set the fetched data to the state
  //     })
  //     .catch(error => console.error("Error fetching data:", error));
  // }, []);

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
    event.preventDefault();
    addNewStore(newStoreName);
    setNewStoreName('');
  };

  return (
    <div className="body-background">
      <header>
        <img src={logoImage} alt="Logo" className="resize-logo" />
      </header>
      <div className="main-content">
        <label htmlFor="stores-dropdown" className="select-label">
          Select a store from the test page:
        </label>
        <br />
        <select
          id="stores-dropdown"
          className="dropdown"
          value={selectedStore}
          onChange={handleStoreChange}
        >
          <option value="">Select a store </option>
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
        <Link to={`/${selectedStore}`} className = "link">Go to Selected Store: {selectedStore}</Link>

        <p> </p>
        <Link to={`/store`} className="link"> Go to Store Page</Link>
        <p> </p>

      </div>
    </div>
  );
};



export default TestPage;
  
