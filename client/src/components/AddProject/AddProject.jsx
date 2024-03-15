import React, { useState } from 'react';
import './AddProject.css';

const AddProject = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    projectName: '',
    localityName: '',
    projectDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    if (value.length <= 500) {
      setFormData({ ...formData, projectDescription: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
  };

  return (
  
    <div className="pr_form-container">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="pr_form-group">
          <label>Write the name of the project:</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="pr_form-group">
          <label>Write the name of locality for project:</label>
          <input
            type="text"
            name="localityName"
            value={formData.localityName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="pr_form-group">
          <label>Write project description in maximum 500 letters:</label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleDescriptionChange}
            maxLength={500}
            rows={4}
            required
          />
          <p className="word-limit">{500 - formData.projectDescription.length} letters remaining</p>
        </div>
        <div className="pr_form-group2">
          <label>Upload a picture related to the project:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {image && <img src={image} alt="Selected" />}
        </div>
        <button type="submit">Add Project</button>
      </form>
    </div>

  );
}

export default AddProject;
