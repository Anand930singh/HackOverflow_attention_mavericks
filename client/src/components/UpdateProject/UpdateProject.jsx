import React,{useState} from 'react'
import './UpdateProject.css'
import { useNavigate, useParams } from "react-router-dom";

const UpdateProject = () => {
    const navigate = useNavigate();
    const { id } = useParams()

    const [formData, setFormData]=useState({
        projectId:id,
        update:''
    })

    const handleDescriptionChange = (e) => {
        const { value } = e.target;
        if (value.length <= 500) {
          setFormData({ ...formData, update: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
      };

      const handleAddUpdate=async()=>{

        const response= await fetch('http://localhost:8050/updateProj/add',{
          method:"POST",
          body:JSON.stringify({
            formData
          }),
          headers:{"Content-type":"application/json"},
        })
        const json=await response.json();
        console.log(json);
        if(json)
        {
          window.location.reload();
        }
      }
    

  return (
    <div className="pr_form-container">
      <h2>Update Project Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="pr_form-group">
          <label>Write updated project description in maximum 500 letters:</label>
          <textarea
            name="update"
            value={formData.update}
            onChange={handleDescriptionChange}
            maxLength={500}
            rows={5}
            required
          />
          <p className="word-limit">{500 - formData.update.length} letters remaining</p>
        </div>
        <button type="submit" onClick={handleAddUpdate}>Add Project</button>
      </form>
    </div>
  )
}

export default UpdateProject
