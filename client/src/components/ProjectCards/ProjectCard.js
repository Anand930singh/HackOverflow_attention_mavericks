import React from 'react'
import './ProjectCard.css'

function ProjectCard() {
  return (
    <div className='projectCardContainer'>
        <div className='imgProjCard'>
        <img src="https://sabarmatiriverfront.com/wp-content/uploads/2022/08/Foot-Over-Bridge.jpeg" alt="image not available" />
        </div>
        <div className='projectDesHead'>
            <div className='projHead'>Heading</div>
            <div className='smallProjDes'>Short Description</div>
        </div>
    </div>
  )
}

export default ProjectCard