import React, { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom'; 
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import * as fetch from '../components/backend.js';

const Menu = () => {

  const [menuData, setMenuData] = useState([]);

  const params = useParams();

  /* FETCH THE DATA */
  useEffect(() => {

    const fetchMenuData = async () => {

      const data = await fetch.getMenuItemList(params.store_id);
      console.log(data);            
      setMenuData(data["data"]);
      
    }

    fetchMenuData()
      .catch((response) => {
          console.log(response.status, response.statusText);
          response.json().then((json) => {
              console.log(json);
      })
    });

    // const fetchedMenuData = [
    //     { Item_ID: 'ITEMID1', Item_name: 'Cheeseburger', Price: 9.99 },
    //     { Item_ID: 'ITEMID2', Item_name: 'Margherita Pizza', Price: 12.50 },
    // ];

    // setMenuData(fetchedMenuData);
}, []);


return (
  <div className="store-body">
      <h1>Restaurant Name</h1>

      <section className="store-section">

      <h2>Menu</h2>
        <ul>
            {menuData.map(item => (
                <li key={item.Item_name}>
                  {item.Item_name} - ${item.Price}
                </li>
            ))}
        </ul>
      </section>
  </div>
);
};

export default Menu