import React from "react";
import { v4 as uuid } from "uuid";
import { useState } from "react";

function ItemForm({ items, handleNewItem, onItemFormSubmit }) {
  const [item, setItemName] = useState({ name: "", category: "Produce" });
  function handleChange(event) {
    setItemName({ ...item, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // generate a string id and build the item object
    const newItem = { ...item, id: uuid() };

    // support two prop names used in the app and tests:
    // - App passes handleNewItem (expects an object with { item })
    // - tests pass onItemFormSubmit (expect the raw item object)
    if (typeof onItemFormSubmit === "function") {
      onItemFormSubmit(newItem);
    } else if (typeof handleNewItem === "function") {
      handleNewItem({ item: newItem });
    }
    setItemName({ name: "", category: "Produce" });
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={handleChange}
          placeholder="Add Item"
        />
      </label>

      <label>
        Category:
        <select name="category" value={item.category} onChange={handleChange}>
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
