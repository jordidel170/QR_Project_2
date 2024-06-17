import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'


const ProductsCard = ({menuItems, setProductId}) => {
  const {store, actions} = useContext(Context)
  const handleEditModal = (id) => {
    setProductId(id)
  }

  const handleDeleteProduct = async(id) => {
      await actions.deleteProduct(id);
      
  }
   

  return (
    
        <>
        
        {menuItems.map((product, index) => (
            <div className="menu-item" key={index}>
              <figure className='figuremenu-item'>
              <img src={product.image} alt={product.name} />
              </figure>
              <h3>{product.name}</h3>
              <div className="description">
               <p>{product.description}</p>
              </div>
              <div className='editButton'>
              <p className="price">{product.price}</p>
             <button className="material-symbols-outlined" onClick={() => {handleEditModal(product.id)}}>edit</button>
             <button className="material-symbols-outlined" onClick={() => {handleDeleteProduct(product.id)}}>delete</button> 
              </div>
            </div>

          ))}
        </>
          
  )
}

export default ProductsCard
