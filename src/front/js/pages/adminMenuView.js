import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../component/sidebar';
import "../../styles/adminMenuView.css"
import CategoriesButton from '../component/categoriesButton';
import ProductsCard from '../component/productsCard';
import EditMenuModal from '../component/editMenuModal';
import { Context } from '../store/appContext';




  const adminMenuView = () => {
const {store, actions} = useContext(Context)
   
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
