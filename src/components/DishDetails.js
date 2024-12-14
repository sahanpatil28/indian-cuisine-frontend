import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For accessing dynamic route parameters

const DishDetails = () => {
  const { name } = useParams(); // Extract the dish name from the URL
  const [dish, setDish] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/dishes/${name}`) // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setDish(data));
  }, [name]);

  if (!dish) return <p>Loading...</p>;

  return (
    <div>
      <h1>{dish.name}</h1>
      <p><strong>Ingredients:</strong> {dish.ingredients}</p>
      <p><strong>Diet Type:</strong> {dish.diet}</p>
      <p><strong>Preparation Time:</strong> {dish.prep_time} mins</p>
      <p><strong>Cooking Time:</strong> {dish.cook_time} mins</p>
      <p><strong>Flavor:</strong> {dish.flavor}</p>
      <p><strong>Course:</strong> {dish.course}</p>
      <p><strong>State:</strong> {dish.state}</p>
      <p><strong>Region:</strong> {dish.region}</p>
    </div>
  );
};

export default DishDetails;
