import React from 'react';
import '../styles/CategoryCard.css';

const CategoryCard = ({ category, onClick }) => {
  return (
    <div className="category-card" onClick={onClick}>
      <img src={category.thumbnail} alt={category.name} className="category-card-image" />
      <div className="category-card-overlay">
        <h3 className="category-card-title">{category.name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
