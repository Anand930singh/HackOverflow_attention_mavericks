//ProjectCard
import React from 'react'
import './ProjectCard.css'
import '../../pages/ProjectDesc/ProjDesc'
import { useNavigate } from "react-router-dom";


function ProjectCard(props) {
    const {id, imgSrc, title, description } = props;
    const navigate = useNavigate();

    const descCropped=(desc,maxLen)=>{
        if (desc.length <= maxLen) return desc;
        return desc.substr(0, maxLen) + '...';
    }
    const handleProject=()=>{
      navigate(`/projDesc/${id}`);
    }

    return (
        <div className='projectCardContainer' onClick={handleProject} >
            <div className='imgProjCard'>
                <img src="https://img.staticmb.com/mbcontent/images/crop/uploads/2024/2/infrastructure-projects-in-India_0_1200.jpg" />
            </div>
            <div className='projectDesHead'>
                <div className='projHead'>{title}</div>
                <div className='smallProjDes'>
                    {descCropped(description,800)}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard





