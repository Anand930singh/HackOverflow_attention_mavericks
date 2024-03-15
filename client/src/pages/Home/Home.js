import React, { useEffect, useState } from 'react';
import './Home.css';
import { CiBookmarkPlus } from "react-icons/ci";
import Cookies from 'js-cookie';
import ProjectCard from '../../components/ProjectCards/ProjectCard';

function Home() {
    const [type,setType] = useState();
    const handleClick = () => {
        window.location.href = "/addProj";
      };

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
      }, [type]);

  return (
    <div className='homeBody'>
        <div className='leftHomeBody'>
            <ProjectCard/>
            <ProjectCard/>
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