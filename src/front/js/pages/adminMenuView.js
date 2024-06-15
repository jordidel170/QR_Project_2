import React from 'react'
import Sidebar from '../component/sidebar';
import "../../styles/adminMenuView.css"




  const adminMenuView = () => {
  const categories = ['Starters', 'Main', 'Dessert', 'Drink'];
  const menuItems = [
    { name: 'Peanut Butter Chicken Burger', price: '₹220', description: 'hacer treinta palabras por lo menos lo que llegue a alcanzar a lo que se puede, esta seria la mitad, entonces faltaria un poco más algo así entonces', img: 'https://tse2.mm.bing.net/th?id=OIP.Epgh66370jM69NUWAw1LHQHaEK&pid=Api' },
    { name: 'Texas Style BBQ Burger', price: '₹210', description: 'hacer treinta palabras por lo menos lo que llegue a alcanzar a lo que se puede, esta seria la mitad, entonces faltaria un poco más algo así entonces', img: 'https://tse2.mm.bing.net/th?id=OIP.a7BG_WibT85epZU5IYOh5QHaE8&pid=Api' },
    { name: 'Texas Style BBQ Burger', price: '₹210', description: 'hacer treinta palabras por lo menos lo que llegue a alcanzar a lo que se puede, esta seria la mitad, entonces faltaria un poco más algo así entonces', ratings: 55, delivered: 60, img: 'https://tse4.mm.bing.net/th?id=OIP.761GqK-wlfuf9P8b3_sa3QHaHa&pid=Api' }
    // Añade más elementos de menú según sea necesario
  ];

  return (
    <div>
      <Sidebar />
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
               <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


    
export default adminMenuView
