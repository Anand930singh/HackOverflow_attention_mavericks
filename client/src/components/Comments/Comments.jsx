import React, { useState } from 'react';
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import './Comments.css'

const Comments = ({ user, comment, timestamp, onEdit, onDelete }) => {
    const[edit_comm,setEdit_comm]=useState();
    const[delete_comm,setDelete_comm]=useState();
  
    return (
    <div className="comment">
      <div className="user-info">
        <FaUser className="user-icon" />
        <span className="username">username</span>
        <span className="timestamp">{new Date(timestamp).toLocaleString()}</span>
      </div>
      <div className="comment-content">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt cupiditate error sit facere quaerat praesentium aspernatur commodi ea porro, ullam consequatur? Aliquam, fugiat. Id ipsam officia mollitia alias placeat eos.</p>
      </div>
      <div className="comment-actions">
        {edit_comm && (<button className="edit-comment" onClick={onEdit}>
          <FaEdit /> Edit
        </button>)}
        {delete_comm && (<button className="delete-comment" onClick={onDelete}>
          <FaTrash /> Delete
        </button>)}
      </div>
    </div>
  );
};

export default Comments;

