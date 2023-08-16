import React, { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom'; 
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

const Menu = () => {

  const [menuData, setMenuData] = useState([]);
  const [store, setStore] = useState([{
    Store_name: ""
  }]);

  const params = useParams();

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  /* FETCH THE DATA */
  useEffect(() => {

    //Get menu data
    let URL = SERVER_URL + "/Menu?store_id=" + params.store_id;
    axios(URL)
    .then((response) => {
      console.log(response.data);
      setMenuData(response.data["data"]);
      console.log(menuData);
    })
    .catch((error) => {
      console.log("Error fetching:" + error);
    });

    //Get current store data
    let STORE_URL = SERVER_URL + "/Store?store_id=" + params.store_id;
    axios(STORE_URL)
    .then((response) => {
      console.log(response.data);
      setStore(response.data["data"]);
      console.log(store)
    })
    .catch((error) => {
      console.log("Error fetching:" + error);
    });

}, []);


return (
  <div className="store-body">
      <h1>{store[0].Store_name}</h1>

      <section className="store-section">

      <h2>{Menu}</h2>
        <ul>
            {menuData.map(item => {
              if (item.Status === 1) {
                return (
                  <li key={item.Item_name}>
                    {item.Item_name} - ${item.Price}
                  </li>
                )
              }
            })}
        </ul>
      </section>
  </div>
);
};

export default Menu