import React from 'react';
import './Home.css';
import { CiBookmarkPlus } from "react-icons/ci";
import ProjectCard from '../../components/ProjectCards/ProjectCard';

function Home() {
  return (
    <div className='homeBody'>
        <div className='leftHomeBody'>
            <ProjectCard/>
            <ProjectCard/>
        </div>
        <div className='rightHomeBody'>
            <div className='addProjectContainer'>
                <div><CiBookmarkPlus size={60} style={{ fontWeight: '10rem' }}/></div>
                <div className='newProj'>New Project</div>
            </div>
        </div>
    </div>
  )
}

export default Home