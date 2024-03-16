
import React from 'react';
import './UpdateComment.css';

const UpdateComment = ({data}) => {
  return (
    <div className='update_comment'>
      <h2>Updated Project Details</h2>
    <div className="comment">
      <div className="comment-content">
        <p>{data}</p>
      </div> 
    </div>
    </div>
  );
}

export default UpdateComment;

