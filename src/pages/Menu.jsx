import React, { useState } from 'react';


const Menu = () => {
  const [menuItems] = useState([
    { id: 'item1', name: 'Burger', price: 10.99 },
    { id: 'item2', name: 'Pizza', price: 12.99 },
    { id: 'item3', name: 'Pasta', price: 8.99 },
    // Add more menu items as needed
  ]);

  return (
    <div className="menu-container">
      <h2>Menu</h2>
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.id} className="menu-item">
            <span className="item-name">{item.name}</span>
            <span className="item-price">${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
