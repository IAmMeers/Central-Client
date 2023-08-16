import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import * as fetch from '../components/backend.js';
import axios from 'axios';

import {BsFillTrashFill, BsFillPencilFill} from 'react-icons/bs';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Inventory = () => {

    const params = useParams();

    const [inventoryData, setInventoryData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [filteredInventory, setFilteredInventory] = useState([]);


    const [newItemOpen, setNewItemOpen] = useState(false);
    const [formState, setFormState] = useState({
        Item_name: "",
        Quantity: 0,
        Quantity_unit: "",
        Threshold: 0
    });
    const [isEdit, setEdit] = useState(false);
    const [disable, setDisable] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);


    function handleDeleteItem(item) {

        console.log("Deleting item: " + item.Item_name);

        let URL = SERVER_URL + "/inventory/deleteItem"
        const body = {
            store_id: params.store_id,
            item_name: item.Item_name
        }   
        //Delete item from inventory 
        axios.put(URL, body)
        .then((response) => {
            console.log(response.data);
            //Fetch data again (refresh inventory)
            axios(SERVER_URL + "/Inventory?store_id=" + params.store_id)
            .then((response) => {
                console.log(response.data);
                setInventoryData(response.data["data"]);
            })
            .catch((error) => {
                console.log("Error fetching: \n" + error);
            });
        })
        .catch((error) => {
            console.log("Error fetching: \n" + error);
        });

    };

    const handleAddItem = (e) => {
        e.preventDefault();
        console.log(formState);
        console.log(validateForm());
        console.log(inventoryData);
        if (!validateForm()) return;
            
        //Add item to inventory DB
        let URL = SERVER_URL + "/inventory/addItem"
        const body = {
            store_id: params.store_id,
            item_name: formState.Item_name,
            quantity: formState.Quantity,
            quantity_unit: formState.Quantity_unit,
            threshold: formState.Threshold
        }   

        axios.post(URL, body)
        .then((response) => {
            console.log(response.data);
            //Fetch data again (refresh inventory)
            axios(SERVER_URL + "/Inventory?store_id=" + params.store_id)
            .then((response) => {
                console.log(response.data);
                setInventoryData(response.data["data"]);
                //Reset form
                setFormState({
                    Item_name: "",
                    Quantity: '0',
                    Quantity_unit: "",
                    Threshold: '0'
                });
            })
            .catch((error) => {
                console.log("Error fetching: \n" + error);
            });
        })
        .catch((error) => {
            console.log("Error fetching: \n" + error);
        });


        setNewItemOpen(false); 
        
    };

    const validateForm = () => {
        //Check if all fields are filled
        if (!formState.Item_name || !formState.Quantity || !formState.Quantity_unit || !formState.Threshold) return false;
        //Check if quantity and threshold are numbers
        if (isNaN(formState.Quantity) || isNaN(formState.Threshold)) return false;
        //Check if quantity and threshold are positive
        if (formState.Quantity < 0 || formState.Threshold < 0) return false;
        //Check if item_name is under 50 characters
        if (formState.Item_name.length > 50) return false;
        //Check if quantity_unit is under 15 characters
        if (formState.Quantity_unit.length > 15) return false;
        
        return true;

    }

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };
    
    /* FETCH THE DATA */
    useEffect(() => {

        const fetchStoreData = async () => {

            const data = await fetch.getInventoryData(params.store_id);            
            setInventoryData(data["data"]);
            
        }

        fetchStoreData()
            .catch((response) => {
                console.log(response.status, response.statusText);
                response.json().then((json) => {
                    console.log(json);
                })
        });

    }, []);


    /* FILTER THE DATA */
    useEffect(() => {
        // Filter inventory based on search query and category
        const filteredItems = inventoryData.filter(item => {
            const matchesQuery =
                item.Item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.Store_id.toLowerCase().includes(searchQuery.toLowerCase());

            if (categoryFilter === 'all') {
                 return matchesQuery;
            }
            // } else if (categoryFilter === 'items') {
            //     return matchesQuery && item.Type === 'item';
            // } else if (categoryFilter === 'food') {
            //     return matchesQuery && item.Type === 'food';
            // } 

            return false;
        });

        setFilteredInventory(filteredItems);
        
    }, [searchQuery, categoryFilter, inventoryData]);

    return (
        <div>
            <div className="inventory-container">
                <h1>The Store ID is {params.store_id}</h1>
                <section className="store-section">
                    <h2>Inventory</h2>
                    <div className="search-container">
                        <span>Search Inventory: </span>
                        <input
                            type="text"
                            placeholder="Search inventory..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {/* <div className="category-filter">
                        <span>Category: </span>
                        <select
                            value={categoryFilter}
                            onChange={e => setCategoryFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="items">Items</option>
                            <option value="food">Food</option>
                        </select>
                    </div> */}

                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Quantity Unit</th>
                                <th>Threshold</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInventory.map(item => (
                                <tr key={item.Item_name}>
                                    <td>{item.Item_name}</td>
                                    <td>{item.Quantity}</td>
                                    <td>{item.Quantity_unit}</td>
                                    <td>{item.Threshold}</td>
                                    <td>
                                        <span className='actions'>
                                            <BsFillTrashFill onClick={() => handleDeleteItem(item)}/>
                                            <BsFillPencilFill />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </section>
                <button className='btn' onClick={() => setNewItemOpen(true)}>Add</button>
            </div>
            {newItemOpen &&   
            <div className="new-item-container" onClick={(e) => {
                if(e.target.className === 'new-item-container')
                setNewItemOpen(false)
            }}>
                <div className="new-item" >
                    <form >
                        <div className='form-group'>
                            <label htmlFor="Item_name">Item Name</label>
                            <input name="Item_name" value={formState.Item_name} onChange={handleChange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="Quantity">Quantity</label>
                            <input name="Quantity" value={formState.Quantity} onChange={handleChange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="Quantity_unit">Quantity Unit</label>
                            <input name="Quantity_unit" value={formState.Quantity_unit} onChange={handleChange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="Threshold">Threshold</label>
                            <input name="Threshold" value={formState.Threshold} onChange={handleChange}/>
                        </div>
                        <button type="submit" className='btn' onClick={handleAddItem}>Submit</button>
                    </form>
                </div>
            </div>
            }       
        </div>
    );


};

export default Inventory;
