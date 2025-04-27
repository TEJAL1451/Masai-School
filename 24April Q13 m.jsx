import React, { useState } from 'react';

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [quantity, setQuantity] = useState('');

  const addItem = () => {
    // Validate input to ensure both name and quantity are provided and quantity is >= 1
    if (!input || !quantity || isNaN(quantity) || quantity < 1) {
      alert('Please enter a valid item name and quantity (quantity must be >= 1).');
      return;
    }

    const newItem = { name: input, quantity: quantity };
    setItems([...items, newItem]);

    // Clear input fields after adding the item
    setInput('');
    setQuantity('');
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const clearAll = () => {
    setItems([]);
  };

  return (
    <div>
      <h1>Shopping List</h1>

      <div>
        <input
          type="text"
          placeholder="Item Name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity} 
            <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>

      {items.length > 0 && (
        <button onClick={clearAll}>Clear All</button>
      )}
    </div>
  );
}

export default ShoppingList;
