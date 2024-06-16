import React, { useContext, useEffect, useState } from 'react'
import "../../styles/editMenuModal.css"
import { Context } from '../store/appContext'


const EditMenuModal = ({filteredItems, productId, setProductId}) => {
    const {store, actions} = useContext(Context)
// const product = filteredItems.filter(item => item.id === 2)


const [updatedFormData, setUpdatedFormData] = useState([])

const categoryName = ["Starters", "Mains", "Desserts", "Drinks"];

const onSave = (updatedFormData) => {
actions.uptadeProductById(productId, updatedFormData.name, updatedFormData.price, updatedFormData.description, updatedFormData.image, updatedFormData.category)
}


const handleSubmit = () => {
    onSave(formData)
}


const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
}

    const fetchProductById = async (id) => {
        const product = await actions.getProductById(id);
        setUpdatedFormData(product)
      }

useEffect( () => {
    fetchProductById(productId)
},[])
  return (
    
    <div>
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <form>
          <label>
            Name:
            <input type="text" name="name" value={updatedFormData.name} onChange={handleChange}/>
          </label>
          <label>
            Price:
            <input type="text" name="price" value={updatedFormData.price} onChange={handleChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={updatedFormData.description} onChange={handleChange}></textarea>
          </label>
          <label>
            Category:
            <select className="category-dropdown" onChange={handleChange}>
                {categoryName.map((name, index) => (<option key={index} value={name} >{name}</option>))} </select>
          </label>
          <label>
            Image URL:
            <input type="text" name="img" value={updatedFormData.image} onChange={handleChange}/>
          </label>
          <button type="submit" onClick={handleSubmit}>Save</button>
          <button type="button" onClick={() => {setProductId("")}}>Cancel</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default EditMenuModal
