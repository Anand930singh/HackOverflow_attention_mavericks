import React, { useEffect, useState } from 'react'
import './ProjDesc.css'
import Comments from '../../components/Comments/Comments'
import { useParams } from 'react-router-dom';
import BarChart from '../../components/Histogram/BarChart';
import PieChart from '../../components/PieChart/PieChart';


function ProjDesc() {
    const [projData,setProjData]=useState(null);
    const [comments,setComments]= useState('');
    const [getComments,setGetComments]=useState([]);
    const {id} = useParams()
    const [data,setData]= useState([]);
    const [classificationData,setClassificationData]= useState([]);
    const handleCommentChange = (e) => {
        setComments(e.target.value);
    };
    const calculate_sentiment = async(comments) => {
        const requestData = {
            requestBody: comments
          };
        const requestBody = JSON.stringify(requestData);    
        const fastApiSentimentResponse = await fetch('http://localhost:8000/sentiment_analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: requestBody
        });
        const SentimentData = await fastApiSentimentResponse.json();
        return SentimentData.fin_score;
      };
      const text_classification=async(comments)=>{
        const requestData = {
            requestBody: comments
          };
        const requestBody = JSON.stringify(requestData);
        const fastApiClassResponse = await fetch('http://localhost:8000/text_classification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: requestBody
        });
        const Classification_data = await fastApiClassResponse.json();
        return Classification_data
      }
    const addComment=async()=>{
        let value = await localStorage.getItem('userData');
        const sentimentScore=await calculate_sentiment(comments);
        const issue_class=await text_classification(comments);
        value = JSON.parse(value);  
        const response= await fetch('http://localhost:8050/comments/add',{
      method:"POST",
      body:JSON.stringify({
        projectId:id,
        userid:value.userId,
        sentimentScore:sentimentScore,
        comment:comments,
        classification:issue_class.issue1,
        classificationTri:1
      }),
      headers:{"Content-type":"application/json"},
    })
    const json=await response.json();
    if(json)
    {
        window.location.reload();
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
            if(json)
            {
                for(let i=0;i<json.length;i++)
                {
                    data.push(json[i].sentimentScore)
                    classificationData.push(json[i].classification);
                }
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
            <div>{data.length > 0&&(<BarChart data={data} />)}</div>
            <div className='pieChart'>
                {classificationData.length>0 && (<PieChart data={classificationData}/>)}
            </div>
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


