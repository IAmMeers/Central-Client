import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'; 
import * as fetch from '../components/backend.js';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Store = () => {

    const params = useParams();

    const [storeData, setStoreData] = useState([]);
    const [staffInformation, setStaffInformation] = useState([]);


    /* FETCH THE DATA */
    useEffect(() => {

        const fetchData = async () => {

            const data = await fetch.getStoreData(params.store_id);            
            setStoreData(data["data"]);
            
        }
    
        fetchData()
            .catch((response) => {
                console.log(response.status, response.statusText);
                response.json().then((json) => {
                    console.log(json);
                })
        });
    
        console.log(storeData);
        
    }, [params]);


    return (
        <div className="store-body">


            {storeData.map(store => (
                                <h1 key={store.Store_ID}>
                                    {store.Store_name}
                                </h1>
                            ))}


            <div className="store-columns">
                <div className="left-column">
                    <section className="store-section">
                        <h2>Store Location </h2>
                        <ul>
                            {storeData.map(store => (
                                <li key={store.Store_ID}>
                                    {store.Street_num} {store.Street}  {store.City}  {store.Province}  {store.Postal} 
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="store-section">
                        <h2>Staff Information</h2>
                        <ul>
                            {staffInformation.map(staff => (
                                <li key={staff.Employee_ID}>
                                    {staff.Fname} {staff.Lname} - {staff.Role}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <div className="right-column">
                    <section className="store-section">
                        <h2>Menu</h2>
                        <Link to={"/menu/" + params.store_id} className="link"> View Menu </Link>
                    </section>

                    <section className="store-section">
                        <h2>Inventory</h2>
                        <Link to={"/inventory/" + params.store_id} className="link"> View Inventory </Link>
                    </section>
                </div>

            </div>

            <section className="store-section">
                <Link to="/" className="link"> Return Home </Link>
            </section>
        </div>
    );
};

export default Store;