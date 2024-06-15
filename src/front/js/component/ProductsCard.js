import React from 'react'

const ProductsCard = ({menuItems}) => {

    
const handleEditModal = () => {}
    
   
  return (
    
        <>
        {console.log(menuItems)}
        {menuItems.map((item, index) => (
            <div className="menu-item" key={index}>
              <figure className='figuremenu-item'>
              <img src={item.img} alt={item.name} />
              </figure>
              <h3>{item.name}</h3>
              <div className="description">
               <p>{item.description}</p>
              </div>
              <div className='editButton'>
              <p className="price">{item.price}</p>
             <button className="material-symbols-outlined">edit</button>
              </div>
            </div>

          ))}
        </>
          
  )
}

export default ProductsCard
