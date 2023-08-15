import React, { useState, useEffect } from 'react';

const Inventory = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [filteredInventory, setFilteredInventory] = useState([]);

    /* FETCH THE DATA */
    useEffect(() => {
        const fetchedInventoryData = [
            ['Chicken McNuggets', 'SID1', 150, 'pieces', 30, 'food'],
            ['Big Mac', 'SID1', 80, 'sandwiches', 20, 'food'],
            ['French Fries', 'SID1', 200, 'servings', 40, 'food'],
            ['Coca-Cola', 'SID1', 100, 'cups', 25, 'food'],
            ['Buns', 'SID1', 300, 'pieces', 60, 'food'],
            ['Ketchup', 'SID1', 20, 'bottles', 5, 'food'],
            ['Mayonnaise', 'SID1', 25, 'jars', 6, 'food'],
            ['Napkins', 'SID1', 1000, 'pieces', 200, 'item'],
            ['Chicken Filets', 'SID1', 200, 'pieces', 40, 'food'],
            ['Apple Pie', 'SID1', 40, 'pies', 10, 'food'],
            ['McFlurry', 'SID1', 70, 'servings', 18, 'food'],
            ['Cheese', 'SID1', 50, 'pounds', 10, 'food'],
            ['Bottled Water', 'SID1', 120, 'bottles', 30, 'food'],
            ['Lettuce', 'SID1', 30, 'pounds', 8, 'food'],
            ['Onions', 'SID1', 40, 'pounds', 12, 'food'],
            ['Tomatoes', 'SID1', 45, 'pounds', 10, 'food'],
            ['Potatoes', 'SID1', 100, 'pounds', 20, 'food'],
            ['Salt', 'SID1', 5, 'bags', 1, 'item'],
            ['Pepper', 'SID1', 8, 'bottles', 2, 'item'],
            ['Straws', 'SID1', 1000, 'pieces', 200, 'item'],
            ['McChicken', 'SID1', 70, 'sandwiches', 15, 'food'],
            ['Hash Browns', 'SID1', 100, 'pieces', 25, 'food'],
            ['Milkshakes', 'SID1', 60, 'servings', 20, 'food'],
            ['Apple Slices', 'SID1', 40, 'packs', 10, 'food'],
            ['Bacon', 'SID1', 30, 'strips', 5, 'food'],
            ['Hotcakes', 'SID1', 80, 'pieces', 18, 'food'],
            ['Orange Juice', 'SID1', 50, 'cups', 12, 'food'],
            ['Mustard', 'SID1', 15, 'bottles', 3, 'food'],
            ['Plastic Cutlery', 'SID1', 500, 'sets', 100, 'item'],
            ['Ice Cream Cones', 'SID1', 40, 'cones', 8, 'food'],
            ['Lemonade', 'SID1', 75, 'cups', 20, 'food'],
            ['Muffins', 'SID1', 50, 'pieces', 10, 'food'],
            ['Onion Rings', 'SID1', 90, 'pieces', 18, 'food'],
            ['Pickles', 'SID1', 25, 'jars', 5, 'food'],
            ['Caramel Sundae', 'SID1', 60, 'sundaes', 15, 'food'],
            ['Sausage Patties', 'SID1', 40, 'patties', 8, 'food'],
            ['Disposable Cups', 'SID1', 200, 'cups', 40, 'item'],
            ['Eggs', 'SID1', 120, 'eggs', 24, 'food'],
            ['Creamer', 'SID1', 15, 'bottles', 3, 'item'],
        ];

        const formattedInventoryData = fetchedInventoryData.map(item => ({
            ItemName: item[0],
            Store_ID: item[1],
            Quantity: item[2],
            QuantityUnit: item[3],
            Threshold: item[4],
            Type: item[5],
        }));

        setInventoryData(formattedInventoryData);
    }, []);

    useEffect(() => {
        // Filter inventory based on search query and category
        const filteredItems = inventoryData.filter(item => {
            const matchesQuery =
                item.ItemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.Store_ID.toLowerCase().includes(searchQuery.toLowerCase());

            if (categoryFilter === 'all') {
                return matchesQuery;
            } else if (categoryFilter === 'items') {
                return matchesQuery && item.Type === 'item';
            } else if (categoryFilter === 'food') {
                return matchesQuery && item.Type === 'food';
            } 

            return false;
        });

        setFilteredInventory(filteredItems);
    }, [searchQuery, categoryFilter, inventoryData]);

    return (
        <div className="inventory-container">
            <h1>McDonalds</h1>
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
                <div className="category-filter">
                    <span>Category: </span>
                    <select
                        value={categoryFilter}
                        onChange={e => setCategoryFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="items">Items</option>
                        <option value="food">Food</option>
                    </select>
                </div>
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Store ID</th>
                            <th>Quantity</th>
                            <th>Quantity Unit</th>
                            <th>Threshold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInventory.map(item => (
                            <tr key={item.ItemName}>
                                <td>{item.ItemName}</td>
                                <td>{item.Store_ID}</td>
                                <td>{item.Quantity}</td>
                                <td>{item.QuantityUnit}</td>
                                <td>{item.Threshold}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Inventory;
