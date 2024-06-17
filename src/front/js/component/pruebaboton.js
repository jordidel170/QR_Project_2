import React, { useState } from 'react';
import './App.css';

const CategoryButtons = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveButton(category);
    // Aquí puedes agregar el código para mostrar los elementos de la categoría correspondiente
  };

  return (
    <div className="category-buttons">
      <button
        className={`category-button ${activeButton === 'category1' ? 'active' : ''}`}
        onClick={() => handleCategoryClick('category1')}
      >
        Categoría 1
      </button>
      <button
        className={`category-button ${activeButton === 'category2' ? 'active' : ''}`}
        onClick={() => handleCategoryClick('category2')}
      >
        Categoría 2
      </button>
      <button
        className={`category-button ${activeButton === 'category3' ? 'active' : ''}`}
        onClick={() => handleCategoryClick('category3')}
      >
        Categoría 3
      </button>
    </div>
  );
};

export default CategoryButtons;

// .category-button {
//     padding: 10px 20px;
//     margin: 5px;
//     background-color: #f0f0f0;
//     border: 1px solid #ccc;
//     cursor: pointer;
//     transition: background-color 0.3s;
//   }
  
//   .category-button.active {
//     background-color: #4CAF50; /* Color "encendido" */
//     color: white;
//   }
  