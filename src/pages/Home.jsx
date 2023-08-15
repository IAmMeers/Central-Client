import React, { useState } from 'react';
import logoImage from '../assets/CentralRestLogo.png';
import { Link } from 'react-router-dom';

const Home = () => {
  const [selectedStore, setSelectedStore] = useState('');
  const [stores, setStores] = useState([
    { id: 'store1', name: 'Store 1' },
    { id: 'store2', name: 'Store 2' },
  ]);
  const [newStoreName, setNewStoreName] = useState('');

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
            <label htmlFor="new-store-name">Add a new store: </label>
            <input
              type="text"
              id="new-store-name"
              value={newStoreName}
              onChange={handleNewStoreNameChange}
            />
            <button type="submit">Add</button>
          </form>
          <p> </p>
          <Link to={`/${selectedStore}`} className="link">
            Go to Selected Store: {selectedStore}
          </Link>
          <p> </p>
          <Link to={`/store`} className="link">
            Go to Store Page
          </Link>
          <p> </p>
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
