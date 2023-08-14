import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Store = () => {
    const [storeData, setStoreData] = useState([]);
    const [menuData, setMenuData] = useState([]);
    const [inventoryData, setInventoryData] = useState([]);
    const [staffInformation, setStaffInformation] = useState([]);
    const [contactInformation, setContactInformation] = useState([]);


    /* FETCH THE DATA */
    useEffect(() => {
        const fetchedStoreData = [
            { Store_ID: 'SID1', Street: '123 Main St', State: 'CA', Zip: '12345' },
        ];

        const fetchedMenuData = [
            { Item_ID: 'ITEMID1', Item_name: 'Cheeseburger', Price: 9.99 },
            { Item_ID: 'ITEMID2', Item_name: 'Margherita Pizza', Price: 12.50 },
        ];

        const fetchedInventoryData = [
            { ItemName: 'Ground Beef', Quantity: 100, QuantityUnit: 'pounds', Threshold: 20 },
            { ItemName: 'Pizza Dough', Quantity: 50, QuantityUnit: 'pounds', Threshold: 15 },
        ];

        const fetchedStaffInformation = [
            { Employee_ID: 'EID1', Fname: 'John', Lname: 'Doe', Role: 'Manager' },
            { Employee_ID: 'EID2', Fname: 'Jane', Lname: 'Smith', Role: 'Waiter' },
            { Employee_ID: 'EID3', Fname: 'Michael', Lname: 'Johnson', Role: 'Cook' },
        ];

        const fetchedContactInformation = [
            { Store_ID: 'SID1', Phone: '123-456-7890', Email: 'info@store1.com' },
        ];

        setStoreData(fetchedStoreData);
        setMenuData(fetchedMenuData);
        setInventoryData(fetchedInventoryData);
        setStaffInformation(fetchedStaffInformation);
        setContactInformation(fetchedContactInformation);
    }, []);



    return (
        <div className="store-body">
            <h1>Restaurant Name</h1>

            <div className="store-columns">
                <div className="left-column">
                    <section className="store-section">
                        <h2>Store Location</h2>
                        <ul>
                            {storeData.map(store => (
                                <li key={store.Store_ID}>
                                    <a href={`/store/${store.Store_ID}`} className="link">
                                        {store.Street}, {store.State}, {store.Zip}
                                    </a>
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
                        <Link to="/menu" className="link"> View Menu </Link>
                        <ul>
                            {menuData.map(item => (
                                
                                <li key={item.Item_ID}>
                                    {item.Item_name} - ${item.Price.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="store-section">
                        <h2>Inventory</h2>
                        <Link to="/inventory" className="link"> View Inventory </Link>
                        <ul>
                            {inventoryData.map(item => (
                                <li key={item.ItemName}>
                                    {item.ItemName} - {item.Quantity} {item.QuantityUnit}
                                </li>
                            ))}
                        </ul>

                    </section>
                </div>

            </div>

            <section className="store-section">
                <h2>Contact Information</h2>
                <ul>
                    {contactInformation.map(contact => (
                        <li key={contact.Store_ID}>
                            Store ID: {contact.Store_ID}
                            <br />
                            Phone: {contact.Phone}
                            <br />
                            Email: {contact.Email}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Store;