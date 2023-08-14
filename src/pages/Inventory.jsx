import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Inventory = () => {

    const [inventoryData, setInventoryData] = useState([]);

  /* FETCH THE DATA */
  useEffect(() => {

    const fetchedInventoryData = [
        { ItemName: 'Ground Beef', Quantity: 100, QuantityUnit: 'pounds', Threshold: 20 },
        { ItemName: 'Pizza Dough', Quantity: 50, QuantityUnit: 'pounds', Threshold: 15 },
    ];

    setInventoryData(fetchedInventoryData);
}, []);


return (
  <div className="store-body">
      <h1>Restaurant Name</h1>

      <section className="store-section">

      <h2>Inventory</h2>
        <ul>
            {inventoryData.map(item => (
                <li key={item.ItemName}>
                    {item.ItemName} - {item.Quantity} {item.QuantityUnit}
                </li>
            ))}
        </ul>
      </section>
  </div>
);
};

export default Inventory