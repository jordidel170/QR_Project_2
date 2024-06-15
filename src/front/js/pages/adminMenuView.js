import React, { useEffect, useState } from 'react'
import Sidebar from '../component/sidebar';
import "../../styles/adminMenuView.css"
import CategoriesButton from '../component/categoriesButton';
import ProductsCard from '../component/productsCard';




  const adminMenuView = () => {

    const menuItems = [
      { name: 'Peanut Butter Chicken Burger', price: '₹220', description: 'hacer treinta palabras por lo menos lo que llegue a alcanzar a lo que se puede, esta seria la mitad, entonces faltaria un poco más algo así entonces', category: 'Desserts' ,img: 'https://tse2.mm.bing.net/th?id=OIP.Epgh66370jM69NUWAw1LHQHaEK&pid=Api' },
      { name: 'Texas Style BBQ Burger', price: '₹210', description: 'hacer treinta palabras por lo menos lo que llegue a alcanzar a lo que se puede, esta seria la mitad, entonces faltaria un poco más algo así entonces', category:'Starters', img: 'https://tse2.mm.bing.net/th?id=OIP.a7BG_WibT85epZU5IYOh5QHaE8&pid=Api' },
      { name: 'Texas Style BBQ Burger', price: '₹210', description: 'hacer treinta palabras por lo menos lo que llegue a alcanzar a lo que se puede, esta seria la mitad, entonces faltaria un poco más algo así entonces', category: 'Mains',img: 'https://tse4.mm.bing.net/th?id=OIP.761GqK-wlfuf9P8b3_sa3QHaHa&pid=Api' },
      { name: 'Water from fiji', price: '₹210', description: 'hacer treinta palabras por lo menos lo que llegue a alcanzar a lo que se puede, esta seria la mitad, entonces faltaria un poco más algo así entonces', category: 'Drinks',img: 'https://tse2.mm.bing.net/th?id=OIP.jqpR0Et_ZgU15kf80MOmkAAAAA&pid=Api' },  
      { name: 'Peanut Butter Chicken Burger', price: '₹220', description: 'hacer treinta palabras por lo menos lo que llegue a alcanzar a lo que se puede, esta seria la mitad, entonces faltaria un poco más algo así entonces', category: 'Desserts' ,img: 'https://tse2.mm.bing.net/th?id=OIP.Epgh66370jM69NUWAw1LHQHaEK&pid=Api' },
      { name: 'Texas Style BBQ Burger', price: '₹210', description: 'hacer treinta palabras por lo menos lo que llegue a alcanzar a lo que se puede, esta seria la mitad, entonces faltaria un poco más algo así entonces', category:'Starters', img: 'https://tse2.mm.bing.net/th?id=OIP.a7BG_WibT85epZU5IYOh5QHaE8&pid=Api' },
      { name: 'Texas Style BBQ Burger', price: '₹210', description: 'hacer treinta palabras por lo menos lo que llegue a alcanzar a lo que se puede, esta seria la mitad, entonces faltaria un poco más algo así entonces', category: 'Mains',img: 'https://tse4.mm.bing.net/th?id=OIP.761GqK-wlfuf9P8b3_sa3QHaHa&pid=Api' },
      { name: 'Water from fiji', price: '₹210', description: 'hacer treinta palabras por lo menos lo que llegue a alcanzar a lo que se puede, esta seria la mitad, entonces faltaria un poco más algo así entonces', category: 'Drinks',img: 'https://tse2.mm.bing.net/th?id=OIP.jqpR0Et_ZgU15kf80MOmkAAAAA&pid=Api' },  
      { name: 'Peanut Butter Chicken Burger', price: '₹220', description: 'hacer treinta palabras por lo menos lo que llegue a alcanzar a lo que se puede, esta seria la mitad, entonces faltaria un poco más algo así entonces', category: 'Desserts' , img: 'https://tse2.mm.bing.net/th?id=OIP.Epgh66370jM69NUWAw1LHQHaEK&pid=Api' },
      { name: 'Texas Style BBQ Burger', price: '₹210', description: 'hacer treinta palabras por lo menos lo que llegue a alcanzar a lo que se puede, esta seria la mitad, entonces faltaria un poco más algo así entonces', category:'Starters', img: 'https://tse2.mm.bing.net/th?id=OIP.a7BG_WibT85epZU5IYOh5QHaE8&pid=Api' },
      { name: 'Texas Style BBQ Burger', price: '₹210', description: 'hacer treinta palabras por lo menos lo que llegue a alcanzar a lo que se puede, esta seria la mitad, entonces faltaria un poco más algo así entonces', category: 'Mains',img: 'https://tse4.mm.bing.net/th?id=OIP.761GqK-wlfuf9P8b3_sa3QHaHa&pid=Api' },
      { name: 'Water from fiji', price: '₹210', description: 'hacer treinta palabras por lo menos lo que llegue a alcanzar a lo que se puede, esta seria la mitad, entonces faltaria un poco más algo así entonces', category: 'Drinks',img: 'https://tse2.mm.bing.net/th?id=OIP.jqpR0Et_ZgU15kf80MOmkAAAAA&pid=Api' }
    
    ];
    const categoryName = ["Starters", "Mains", "Desserts","Drinks", "All"]
    const [selectedCategory, setSelectedCategory] = useState("All");
    let filteredItems = selectedCategory === "All"
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

    useEffect ( () => {
     filteredItems = []
    },[selectedCategory])
console.log(selectedCategory)
  return (
    <div>
      <Sidebar />
      <div className="menu-container">
        <CategoriesButton categoryName={categoryName} setSelectedCategory={setSelectedCategory}/>
        <ProductsCard menuItems={filteredItems}/>
      </div>
    </div>
  );
}


    
export default adminMenuView
