import React from 'react'
import CreateProduct from './createProduct'

const CategoriesButton = ({ categoryName, setSelectedCategory }) => {




  return (
   
    <>
    <div className="menu-header">
          <h1>Menu</h1>
          <button className='createproduct'> Create New Product
        <CreateProduct />
        </button>
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
