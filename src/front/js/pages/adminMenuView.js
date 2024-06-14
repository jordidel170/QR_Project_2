import React from 'react'


  const adminMenuView = () => {
  const categories = ['Starters', 'Burgers', 'Sandwiches', 'Pasta', 'Steaks', 'Desserts', 'Mojitos'];
  const menuItems = [
    { name: 'Peanut Butter Chicken Burger', price: '₹220', ratings: 64, delivered: 75, img: 'link_to_image' },
    { name: 'Texas Style BBQ Burger', price: '₹210', ratings: 55, delivered: 60, img: 'link_to_image' },
    // Añade más elementos de menú según sea necesario
  ];

  return (
    <div>
      <div className="sidebar">
        <ul>
          <li><a href="#">Overview</a></li>
          <li><a href="#">Menu</a></li>
          <li><a href="#">Rating & Reviews</a></li>
          <li><a href="#">Delivery</a></li>
          <li><a href="#">Analytics</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </div>
      <div className="menu-container">
        <div className="menu-header">
          <h1>Menu</h1>
          <button>+ Add Menu</button>
        </div>
        <div className="menu-categories">
          {categories.map(category => (
            <div className="category" key={category}>{category}</div>
          ))}
        </div>
        <div className="menu-items">
          {menuItems.map(item => (
            <div className="menu-item" key={item.name}>
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="price">{item.price}</p>
              <div className="ratings">
                <span>⭐ {item.ratings}</span>
                <span>({item.delivered} delivered)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


    
export default adminMenuView
