import React, { useEffect, useState } from 'react'
import Sidebar from '../component/sidebar';
import "../../styles/adminMenuView.css"
import CategoriesButton from '../component/categoriesButton';
import ProductsCard from '../component/productsCard';
import EditMenuModal from '../component/editMenuModal';




  const adminMenuView = () => {

    const menuItems = [
      { id: 2, name: 'Texas Style BBQ Burger', price: '₹210', description: 'Descripción larga para asegurar 30 palabras...', category:'Starters', img: 'https://tse2.mm.bing.net/th?id=OIP.a7BG_WibT85epZU5IYOh5QHaE8&pid=Api' },
      { id: 3, name: 'Texas Style BBQ Burger', price: '₹210', description: 'Descripción larga para asegurar 30 palabras...', category: 'Mains',img: 'https://tse4.mm.bing.net/th?id=OIP.761GqK-wlfuf9P8b3_sa3QHaHa&pid=Api' },
      { id: 4, name: 'Water from fiji', price: '₹210', description: 'Descripción larga para asegurar 30 palabras...', category: 'Drinks',img: 'https://tse2.mm.bing.net/th?id=OIP.jqpR0Et_ZgU15kf80MOmkAAAAA&pid=Api' },  
      { id: 5, name: 'Peanut Butter Chicken Burger', price: '₹220', description: 'Descripción larga para asegurar 30 palabras...', category: 'Desserts' ,img: 'https://tse2.mm.bing.net/th?id=OIP.Epgh66370jM69NUWAw1LHQHaEK&pid=Api' },
      { id: 6, name: 'Peanut Butter Chicken Burger', price: '₹220', description: 'Descripción larga para asegurar 30 palabras...', category: 'Desserts' ,img: 'https://tse2.mm.bing.net/th?id=OIP.Epgh66370jM69NUWAw1LHQHaEK&pid=Api' },
    
    ];
    const categoryName = ["All", "Starters", "Mains", "Desserts", "Drinks"];
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredItems, setFilteredItems] = useState(menuItems);
    console.log(filteredItems)
  
  
  
  return (
    <div>
      <Sidebar />
      <div className="menu-container">
        <CategoriesButton categoryName={categoryName} setSelectedCategory={setSelectedCategory}/>
        <div className='menu-items'>
          {selectedCategory === "All" ?  <ProductsCard menuItems={menuItems}/> : <ProductsCard menuItems={menuItems.filter(item => item.category === selectedCategory)}/>}
        </div>
        <div className='editModalMenu'>
      <EditMenuModal filteredItems={filteredItems}/>
        </div>
      </div>
    </div>
  );
}


    
export default adminMenuView
