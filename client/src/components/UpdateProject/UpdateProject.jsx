import React,{useState} from 'react'
import './UpdateProject.css'
import { useNavigate } from "react-router-dom";

const UpdateProject = () => {
    const navigate = useNavigate();
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

      const handleAddUpdate=async()=>{
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
      <h2>Update Project Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="pr_form-group">
          <label>Write updated project description in maximum 500 letters:</label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleDescriptionChange}
            maxLength={500}
            rows={5}
            required
          />
          <p className="word-limit">{500 - formData.projectDescription.length} letters remaining</p>
        </div>
        <button type="submit" onClick={handleAddUpdate}>Add Project</button>
      </form>
    </div>
  )
}

export default UpdateProject
