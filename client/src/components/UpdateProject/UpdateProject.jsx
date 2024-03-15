import React,{useState} from 'react'
import './UpdateProject.css'

const UpdateProject = () => {
    const [formData, setFormData]=useState({
        projectDescription:'',
    })

    const handleDescriptionChange = (e) => {
        const { value } = e.target;
        if (value.length <= 500) {
          setFormData({ ...formData, projectDescription: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
      };
    

  return (
    <div className="pr_form-container">
      <h2>Update Project Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="pr_form-group">
          <label>Write updated project description in maximum 500 letters:</label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleDescriptionChange}
            maxLength={500}
            rows={9}
            required
          />
          <p className="word-limit">{500 - formData.projectDescription.length} letters remaining</p>
        </div>
        <button type="submit">Add Project</button>
      </form>
    </div>
  )
}

export default UpdateProject
