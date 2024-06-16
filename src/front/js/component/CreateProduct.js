import React, { useContext,  useState } from 'react'
import { Context } from '../store/appContext'

const CreateProduct = () => {
const {store, actions} = useContext(Context)
const [newProductData, setNewProductData] = useState("")
const categoryName = ["Starters", "Mains", "Desserts", "Drinks"];
const [creationMode, setCreationMode] = useState(true)


    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewProductData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    console.log(newProductData)
    const onSave = (newProductData) => {
        actions.createNewProduct(newProductData.name, newProductData.price, newProductData.description, newProductData.image,newProductData.category)
        }
    
    
    const handleSubmit = () => {
    onSave(newProductData)
    }

  return (
    <> 
    {creationMode ? 
    <div className="modal-overlay">
        <div className="modal-content">
          <h2>Create Product</h2>
          <form method='POST'>
            <label>
              Name:
              <input type="text" name="name" value={newProductData.name} onChange={handleChange}/>
            </label>
            <label>
              Price:
              <input type="text" name="price" value={newProductData.price} onChange={handleChange} />
            </label>
            <label>
              Description:
              <textarea name="description" value={newProductData.description} onChange={handleChange}></textarea>
            </label>
            <label>
              Category:
              <select className="category-dropdown" name = "category" onChange={handleChange}>
                  {categoryName.map((name, index) => (<option key={index} value={newProductData.category} >{name}</option>))} </select>
            </label>
            <label>
              Image URL:
              <input type="text" name="image" value={newProductData.image} onChange={handleChange}/>
            </label>
            <button type="submit" onClick={handleSubmit}>Save</button>
            <button type="button" onClick={() => {setCreationMode(false)}}>Cancel</button>
          </form>
        </div>
      </div> : "" }
      
      
    </>
  )
}

export default CreateProduct
