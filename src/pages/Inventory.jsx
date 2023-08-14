import React from 'react';
//create a search bar 
const Inventory = ({ inventoryData }) => {
    return (
        <div className="inventory-body">
            <h1>Inventory</h1>
            <ul>
                {inventoryData.map(item => (
                    <li key={item.ItemName}>
                        {item.ItemName} - {item.Quantity} {item.QuantityUnit}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Inventory;
