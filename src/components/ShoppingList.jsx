import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, handleNewItem }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSearch, onSearchChange] = useState("");

  console.log(selectedSearch);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const itemsToDisplay = items.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(selectedSearch.toLowerCase())
  );
  

  return (
    <div className="ShoppingList">
      <ItemForm items={items} handleNewItem={handleNewItem} />
      <Filter
        onCategoryChange={handleCategoryChange}
        search={selectedSearch}
        onSearchChange={onSearchChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
