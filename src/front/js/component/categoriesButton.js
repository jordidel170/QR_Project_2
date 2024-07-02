import React from 'react';

const CategoriesButton = ({ categoryName, selectedCategory, setSelectedCategory, setOpenModal }) => {
  return (
    <>
    
      <div className="menu-header">
        
        <button className='createproduct' onClick={() => { setOpenModal(true) }}>Create New Product</button>
      </div>
      <div className="menu-categories">
        {categoryName.map((category, index) => (
          <button
            className={`category ${selectedCategory === category ? 'active' : ''} ${category.replace(/\s+/g, '-').toLowerCase()}1`}
            key={index}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
}

export default CategoriesButton;

