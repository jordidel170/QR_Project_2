import React from 'react'

const ProductsCard = ({menuItems}) => {
  return (
    
        <div className="menu-items">
          {menuItems.map(item => (
            <div className="menu-item" key={item.name}>
              <figure className='figuremenu-item'>
              <img src={item.img} alt={item.name} />
              </figure>
              <h3>{item.name}</h3>
              <div className="description">
               <p>{item.description}</p>
              </div>
              <div className='editButton'>
              <p className="price">{item.price}</p>
             <button class="material-symbols-outlined">edit</button>
              </div>
            </div>

          ))}
        </div>
  )
}

export default ProductsCard
