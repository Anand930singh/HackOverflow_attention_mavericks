import React, { useState } from 'react';
import './AddProject.css';
import { useNavigate } from "react-router-dom";


const AddProject = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    image:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    if (value.length <= 2000) {
      setFormData({ ...formData, description: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
  };

  const handleAddProject=async()=>{
    const response= await fetch('http://localhost:8050/project/add',{
      method:"POST",
      body:JSON.stringify({
        formData
      }),
      headers:{"Content-type":"application/json"},
    })
    const json=await response.json();
    if(json)
    {
      navigate('/home');
    }
  }

  return (
    <div className="pr_form-container">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="pr_form-group">
          <label>Write the name of the project:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="pr_form-group">
          <label>Write the name of locality for project:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="pr_form-group">
          <label>Write project description in maximum 500 letters:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleDescriptionChange}
            maxLength={2000}
            rows={4}
            required
          />
          <p className="word-limit">{2000 - formData.description.length} letters remaining</p>
        </div>
        <div className="pr_form-group2">
          <label>Upload a picture related to the project:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {image && <img src={image} alt="Selected" />}
        </div>
        <button type="submit" onClick={handleAddProject}>Add Project</button>
      </form>
    </div>
  );
}

export default AddProject;
