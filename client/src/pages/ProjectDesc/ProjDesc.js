import React, { useEffect, useState } from 'react'
import './ProjDesc.css'
import Comments from '../../components/Comments/Comments'
import { useParams } from 'react-router-dom';

function ProjDesc() {
    const [projData,setProjData]=useState(null);
    const [comments,setComments]= useState('');
    const [getComments,setGetComments]=useState([]);
    const {id} = useParams()
    const [userId,setUserId]= useState();
    const [sentimentNum,setsentimentNum]=useState(1);
    const handleCommentChange = (e) => {
        setComments(e.target.value);
    };

    const addComment=async()=>{
        let value = await localStorage.getItem('userData');
        value = JSON.parse(value);  
        console.log(value)
        const response= await fetch('http://localhost:8050/comments/add',{
      method:"POST",
      body:JSON.stringify({
        projectId:id,
        userid:value.userId,
        sentimentScore:sentimentNum,
        comment:comments,
      }),
      headers:{"Content-type":"application/json"},
    })
    const json=await response.json();
    if(json)
    {
        
    }
    }

    const getProjectDetail=async()=>{
        const response= await fetch('http://localhost:8050/project/getById',{
        method:"POST",
        body:JSON.stringify({
            id:id
        }),
        headers:{"Content-type":"application/json"},
        })
        const json=await response.json();
        if(json)
        {
            setProjData(json);
        }
    }
    const getAllComments=async()=>{
            const response= await fetch('http://localhost:8050/Comments/getById',{
            method:"POST",
            body:JSON.stringify({
                id:id
            }),
            headers:{"Content-type":"application/json"},
            })
            const json=await response.json();
            console.log(json);
            if(json)
            {
                setGetComments(json)
            }
    }
    useEffect(()=>{
        getAllComments()
        getProjectDetail()
    },[])

    return (
        <div className='projDescPage'>
            {projData && (<div className='projDesc'>
                <div className='imgProjDesc'>
                    <img src="https://sabarmatiriverfront.com/wp-content/uploads/2022/08/Foot-Over-Bridge.jpeg" alt="not available" />
                </div>
                <div className='descriptionProjDescContainer'>
                    <div className='descriptionProjectTitle'>
                        {projData.title}
                    </div>
                    <div className='descriptionProjectDesc'>
                        {projData.description}
                    </div>
                </div>
            </div>)}
            <div className='addSeeComments'>
            <div className='addComments'>
            <input
                        className="commentInput"
                        type="text"
                        id="commentInput"
                        name="comments"
                        value={comments}
                        onChange={handleCommentChange}
                        placeholder="Type your comment here..."
                    />
                <button type='submit' className='addCommentButton' onClick={addComment}>Add Comment</button>
            </div>
            <div className='seeComments'>
                {getComments.map(comments=>(
                    <Comments
                        comment={comments.comment}
                        timestamp={comments.createdon}
                    />
                ))

                }
            </div>
            </div>
        </div>
    )
}

export default ProjDesc


