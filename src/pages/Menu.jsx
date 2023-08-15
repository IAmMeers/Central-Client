import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Menu = () => {

  const [menuData, setMenuData] = useState([]);

  /* FETCH THE DATA */
  useEffect(() => {

    const fetchedMenuData = [
        { Item_ID: 'ITEMID1', Item_name: 'Cheeseburger', Price: 9.99 },
        { Item_ID: 'ITEMID2', Item_name: 'Margherita Pizza', Price: 12.50 },
    ];

    setMenuData(fetchedMenuData);
}, []);


return (
  <div className="store-body">
      <h1>Restaurant Name</h1>

      <section className="store-section">

      <h2>Menu</h2>
        <ul>
            {menuData.map(item => (
                <li key={item.Item_ID}>
                  {item.Item_name} - ${item.Price.toFixed(2)}
                </li>
            ))}
        </ul>
      </section>
  </div>
);
};

export default Menu