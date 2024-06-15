import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../component/sidebar';
import "../../styles/adminMenuView.css"
import CategoriesButton from '../component/categoriesButton';
import ProductsCard from '../component/productsCard';
import EditMenuModal from '../component/editMenuModal';
import { Context } from '../store/appContext';




  const adminMenuView = () => {
const {store, actions} = useContext(Context)
    // const menuItems = [
    //   { id: 2, name: 'Texas Style BBQ Burger', price: '₹210', description: 'Descripción larga para asegurar 30 palabras...', category:'Starters', img: 'https://tse2.mm.bing.net/th?id=OIP.a7BG_WibT85epZU5IYOh5QHaE8&pid=Api' },
    //   { id: 3, name: 'Texas Style BBQ Burger', price: '₹210', description: 'Descripción larga para asegurar 30 palabras...', category: 'Mains',img: 'https://tse4.mm.bing.net/th?id=OIP.761GqK-wlfuf9P8b3_sa3QHaHa&pid=Api' },
    //   { id: 4, name: 'Water from fiji', price: '₹210', description: 'Descripción larga para asegurar 30 palabras...', category: 'Drinks',img: 'https://tse2.mm.bing.net/th?id=OIP.jqpR0Et_ZgU15kf80MOmkAAAAA&pid=Api' },  
    //   { id: 5, name: 'Peanut Butter Chicken Burger', price: '₹220', description: 'Descripción larga para asegurar 30 palabras...', category: 'Desserts' ,img: 'https://tse2.mm.bing.net/th?id=OIP.Epgh66370jM69NUWAw1LHQHaEK&pid=Api' },
    //   { id: 6, name: 'Peanut Butter Chicken Burger', price: '₹220', description: 'Descripción larga para asegurar 30 palabras...', category: 'Desserts' ,img: 'https://tse2.mm.bing.net/th?id=OIP.Epgh66370jM69NUWAw1LHQHaEK&pid=Api' },
    
    // ];
    const categoryName = ["All", "Starters", "Mains", "Desserts", "Drinks"];
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredItems, setFilteredItems] = useState([]);
    const [productId, setProductId] = useState("")
    // console.log(filteredItems)
  
const fetchProduct = async() => {
  const products =  await actions.getProduct()
  setFilteredItems(products)
}


  useEffect( () => {
    fetchProduct()
  
  },[])
  
  return (
    <div>
      <Sidebar />
      <div className="menu-container">
        <CategoriesButton categoryName={categoryName} setSelectedCategory={setSelectedCategory}/>
        <div className='menu-items'>
          {selectedCategory === "All" ?  <ProductsCard menuItems={filteredItems} setProductId={setProductId}/> : <ProductsCard menuItems={filteredItems.filter(product => product.category === selectedCategory)} setProductId={setProductId}/>}
        </div>
        <div className='editModalMenu'>
     {productId === "" ? <></> : <EditMenuModal filteredItems={filteredItems} productId={productId} setProductId={setProductId}/> }
        </div>
      </div>
    </div>
  );
}


    
export default adminMenuView
