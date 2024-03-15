import React, { useEffect, useState } from 'react'
import './ProjDesc.css'
import Comments from '../../components/Comments/Comments'
import { useParams } from 'react-router-dom';

function ProjDesc() {
    const [projData,setProjData]=useState(null);
    const [comments,setComments]= useState('');
    const [predclass,setPredclass]= useState('');
    const [getComments,setGetComments]=useState([]);
    const {id} = useParams()
    const [userId,setUserId]= useState();
    const [sentimentNum,setsentimentNum]=useState(0);
    const handleCommentChange = (e) => {
        setComments(e.target.value);
    };
    const calculate_sentiment = async(comments) => {
        const requestData = {
            requestBody: comments
          };
        console.log(requestData,'requestData')
        const requestBody = JSON.stringify(requestData);    
        const fastApiSentimentResponse = await fetch('http://localhost:8000/sentiment_analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: requestBody
        });
        console.log('hihi');
        const SentimentData = await fastApiSentimentResponse.json();
        console.log(SentimentData.fin_score,'jwgds')
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
        console.log(Classification_data.issue1,'wheiu')
        return Classification_data
      }
    const addComment=async()=>{
        let value = await localStorage.getItem('userData');
        const sentimentScore=await calculate_sentiment(comments);
        const issue_class=await text_classification(comments);
        console.log(sentimentScore,'fromxyz')
        console.log(issue_class.issue1,'textClass')
        value = JSON.parse(value);  
        console.log(value)

        const response= await fetch('http://localhost:8050/comments/add',{
      method:"POST",
      body:JSON.stringify({
        projectId:id,
        userid:value.userId,
        sentimentScore:sentimentScore,
        comment:comments,
      }),
      headers:{"Content-type":"application/json"},
    })
    const json=await response.json();
    if(json)
    {
        console.log("comments Added")
        window.location.reload()
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


