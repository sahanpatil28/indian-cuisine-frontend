import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DishList = () => {
  const [dishes, setDishes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDishes, setFilteredDishes] = useState([]);

  const itemsPerPage = 5; // Pagination limit

  useEffect(() => {
    fetch('http://localhost:3000/dishes') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setDishes(data);
        setFilteredDishes(data);
      });
  }, []);

  // Handle filtering by search term
  useEffect(() => {
    const results = dishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.diet.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDishes(results);
  }, [searchTerm, dishes]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDishes = filteredDishes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
   <div className="dish-list-header">
  <h1>Flavors of India</h1>
  <div className="search-container">
    <input
      className="search-bar"
      type="text"
      placeholder="Search dishes, ingredients, or states..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button className="search-button">🔍</button>
  </div>
</div>

<div className="table-container">
  <table className="styled-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Preparation Time</th>
        <th>Cooking Time</th>
        <th>Diet</th>
        <th>State</th>
      </tr>
    </thead>
    <tbody>
      {currentDishes.map((dish) => (
        <tr key={dish.name}>
          <td>
            <Link to={`/dish/${dish.name}`} className="dish-link">
              {dish.name}
            </Link>
          </td>
          <td>{dish.prep_time} mins</td>
          <td>{dish.cook_time} mins</td>
          <td>{dish.diet}</td>
          <td>{dish.state}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

<div className="pagination-wrapper">
  <button
    className="pagination-pill prev"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
  >
    ⬅ Prev
  </button>

  {Array.from(
    { length: Math.ceil(filteredDishes.length / itemsPerPage) },
    (_, index) => (
      <button
        key={index}
        className={`pagination-pill ${
          currentPage === index + 1 ? 'active' : ''
        }`}
        onClick={() => setCurrentPage(index + 1)}
      >
        {index + 1}
      </button>
    )
  )}

  <button
    className="pagination-pill next"
    disabled={currentPage === Math.ceil(filteredDishes.length / itemsPerPage)}
    onClick={() =>
      setCurrentPage((prev) =>
        Math.min(prev + 1, Math.ceil(filteredDishes.length / itemsPerPage))
      )
    }
  >
    Next ➡
  </button>
</div>

    </div>
  );
};

export default DishList;
