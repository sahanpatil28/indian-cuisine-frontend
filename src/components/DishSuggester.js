import React, { useState } from 'react';

const DishSuggester = () => {
  const [selectedIngredients, setSelectedIngredients] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    fetch(
      `http://localhost:3000/dishes/suggest?ingredients=${selectedIngredients}`
    ) // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setSuggestions(data));
  };

  return (
    <div>
      <h1>Dish Suggester</h1>
      <input
        type="text"
        placeholder="Enter ingredients (comma-separated)"
        value={selectedIngredients}
        onChange={(e) => setSelectedIngredients(e.target.value)}
      />
      <button onClick={handleSearch}>Suggest Dishes</button>
      <ul>
        {suggestions.map((dish) => (
          <li key={dish.name}>{dish.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DishSuggester;
