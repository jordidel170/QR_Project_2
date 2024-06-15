import React, { useState } from 'react'
import "../../styles/editMenuModal.css"


const EditMenuModal = ({filteredItems}) => {
const product = filteredItems.filter(item => item.id === 2)
console.log([...product])

const [formData, setFormData] = useState([...product])
const categoryName = ["Starters", "Mains", "Desserts", "Drinks"];
const handleSubmit = (event) => {
    event.preventDefatult();
    onSave(formData)
}

    const handleClick = (event) => {
        console.log(event.target)
    }
  return (
    <div>
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData[0].name} onClick={handleClick}/>
          </label>
          <label>
            Price:
            <input type="text" name="price"  />
          </label>
          <label>
            Description:
            <textarea name="description" ></textarea>
          </label>
          <label>
            Category:
            <select className="category-dropdown" >
                {categoryName.map((name, index) => (<option key={index} value={name}>{name}</option>))}</select>
            <input type="text" name="category"  />
          </label>
          <label>
            Image URL:
            <input type="text" name="img" />
          </label>
          <button type="submit">Save</button>
          <button type="button" >Cancel</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default EditMenuModal
