import React, { useState, useEffect } from 'react';
import logoImage from '../assets/CentralRestLogo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as fetch from '../components/backend.js';


const Home = () => {
  const [selectedStore, setSelectedStore] = useState(undefined);
  const [stores, setStores] = useState([]);
  const [newStoreName, setNewStoreName] = useState('');

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  /* FETCH THE DATA */
  useEffect(() => {

    let URL = SERVER_URL + "/store/StoreList";
    axios(URL)
    .then((response) => {
      console.log(response.data);
      setStores(response.data["data"]);
    })
    .catch((error) => {
      console.log("Error fetching:" + error);
    });

  }, []);


  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };

  const addNewStore = (newStoreName) => {
    // const newStore = {
    //   id: `store${stores.length + 1}`,
    //   name: newStoreName,
    // };
    // setStores([...stores, newStore]);
    console.log(selectedStore);
  };

  const handleNewStoreNameChange = (event) => {
    setNewStoreName(event.target.value);
  };

  const handleAddStore = (event) => {
    event.preventDefault();
    addNewStore(newStoreName);
    setNewStoreName('');
  };




  const [activeTab, setActiveTab] = useState('overview');
  const tabContent = {
    overview:
      'We plan on storing data for inventory management that allows owners to create, update, and delete stock in a variety of different units.',
    projectDescription:
      'For this project, we would like to design a centralized restaurant management application that allows business owners to track inventory. The goal of the application is to provide a useful tool that makes inventory and order management easy and streamlined.',
    contactInfo: 
    'This project was created by Kenneth Mendoza, Luca Smith, and Evelyn Ramirez',

  };

  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      setActiveTab(null);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="body-background">
      <header>
        <img src={logoImage} alt="Logo" className="resize-logo" />
      </header>
      <div className="main-content">
        <div className="content-right">

          <div className="store-selection">
            <label htmlFor="stores-dropdown" className="select-label">
              Select a store
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
                <option key={store.Store_id} value={store.Store_id}>
                  {store.Store_name}
                </option>
              ))}
            </select>
            <br />
            {selectedStore != undefined ? (
              <Link to={`/store/` + selectedStore} className="link">Go to Store Page</Link>
            ) : (
              <></>
            )}
          </div>
          
          <br />
          <br />
          <form onSubmit={handleAddStore}>
            <label htmlFor="new-store-name">Add a new store</label>
            <br />
            <input
              type="text"
              id="new-store-name"
              value={newStoreName}
              onChange={handleNewStoreNameChange}
            />
            <button type="submit">Add</button>
          </form>

        </div>
        <div className="content-left">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => handleTabClick('overview')}
            >
              Overview
            </button>
            <button
              className={`tab ${
                activeTab === 'projectDescription' ? 'active' : ''
              }`}
              onClick={() => handleTabClick('projectDescription')}
            >
              Project Description
            </button>
            <button
              className={`tab ${activeTab === 'contactInfo' ? 'active' : ''}`}
              onClick={() => handleTabClick('contactInfo')}
            >
              Members’ Contact Information
            </button>
          </div>
          <div className="tab-content">
            {activeTab && (
              <div className={`tab-text ${activeTab ? 'active' : ''}`}>
                {activeTab === 'overview' && <p>{tabContent.overview}</p>}
                {activeTab === 'projectDescription' && (
                  <p>{tabContent.projectDescription}</p>
                )}
                {activeTab === 'contactInfo' && <p>{tabContent.contactInfo}</p>}
              </div>
            )}
          </div>
          <p> </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
