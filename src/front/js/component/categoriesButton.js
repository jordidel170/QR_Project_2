import React from 'react'

const CategoriesButton = ({ categoryName, setSelectedCategory }) => {




  return (
   
    <>
    <div className="menu-header">
          <h1>Menu</h1>
        </div>
        <div className="menu-categories">
          {categoryName.map((category, index) => (
            <div className="category" key={index} onClick={() => {setSelectedCategory(category)} }>{category}</div>
          ))}
        </div>
    </>
        
   
  )
}

export default CategoriesButton
