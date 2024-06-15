import React, { useContext, useEffect, useState } from 'react'
import "../../styles/editMenuModal.css"
import { Context } from '../store/appContext'


const EditMenuModal = ({filteredItems, productId, setProductId}) => {
    const {store, actions} = useContext(Context)
const product = filteredItems.filter(item => item.id === 2)
// console.log(product)

const [formData, setFormData] = useState([])
// console.log(formData)
const categoryName = ["Starters", "Mains", "Desserts", "Drinks"];
const handleSubmit = (event) => {
    event.preventDefatult();
    onSave(formData)
}

    const handleClick = (event) => {
        console.log(event.target)
    }
    const fetchProductById = async (id) => {
        const product = await actions.getProductById(id);
        setFormData(product)
      }

useEffect( () => {
    fetchProductById(productId)
},[])
  return (
    
    <div>
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onClick={handleClick}/>
          </label>
          <label>
            Price:
            <input type="text" name="price" value={formData.price}  />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description}></textarea>
          </label>
          <label>
            Category:
            <select className="category-dropdown" >
                {categoryName.map((name, index) => (<option key={index} value={name}>{name}</option>))}</select>
            <input type="text" name="category"  />
          </label>
          <label>
            Image URL:
            <input type="text" name="img" value={formData.image}/>
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => {setProductId("")}}>Cancel</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default EditMenuModal
