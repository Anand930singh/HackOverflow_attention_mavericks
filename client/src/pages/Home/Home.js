import React, { useEffect, useState } from 'react';
import './Home.css';
import { CiBookmarkPlus } from "react-icons/ci";
import ProjectCard from '../../components/ProjectCards/ProjectCard';

function Home() {
    const [type,setType] = useState();
    const [projects,setProjects]= useState([])
    const handleClick = () => {
        window.location.href = "/addProj";
      };

      const getProj=async()=>{
        const response= await fetch('http://localhost:8050/project/getProjects',{
          method:"GET",
          headers:{"Content-type":"application/json"},
        })
        const json=await response.json();
        console.log(json);
        if(json)
        {
          setProjects(json);
        }
      }

      useEffect(() => {
        const fetchData = async () => {
          try {
            let value = await localStorage.getItem('userData');
            value = JSON.parse(value);
            setType(value.type)
          } catch (error) {
            console.error('Error retrieving cookie:', error);
          }
        };
    
        fetchData();
        getProj();
      }, [type]);

  return (
    <div className='homeBody'>
        <div className='leftHomeBody'>
        {projects.map(project => (
                    <ProjectCard
                        id={project.id}
                        imgSrc={project.image}
                        title={project.title}
                        description={project.description}
                    />
                ))}
        </div>
        {type===1 && (<div className='rightHomeBody'>
            <div className='addProjectContainer' onClick={handleClick}>
                <div><CiBookmarkPlus size={60} style={{ fontWeight: '10rem' }}/></div>
                <div className='newProj'>New Project</div>
            </div>
        </div>)}
    </div>
  )
}

export default Home