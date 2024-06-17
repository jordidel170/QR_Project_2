import React, { useEffect, useState } from 'react'
import CreateProduct from './CreateProduct'

const CategoriesButton = ({ categoryName, setSelectedCategory, setOpenModal}) => {



  return (
      <>
      <div className="menu-header">
          <h1>Menu</h1>
          <button className='createproduct' onClick={() => {setOpenModal(true)}}> Create New Product
        </button>
        </div>
        <div className="menu-categories">
          {categoryName.map((category, index) => (
            <button className="category" key={index} onClick={() => {setSelectedCategory(category)} }>{category}</button>
          ))}
        </div>
        </>
  )
}

export default CategoriesButton
