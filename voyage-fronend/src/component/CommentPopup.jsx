import React, { useRef, useEffect, useState } from "react";
import { executeGetCommentOfPost, executePostCommentForPost } from "../api/CommentApiService";

const CommentPopup = ({ postId, comments, onClose }) => {
  const popupRef = useRef(null);
  const [empty, setEmpty] = useState("");
  const [comment, setComment] = useState("");

  function handleInputChange(e) {
    setComment(e.target.value);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // async function retrieveCommentOfPost(postId) {
  //   const response = await executeGetCommentOfPost(postId);
  //   if (response.status === 200) {
  //     console.log(response.data.content)
  //     setComments(response.data.content);
  //     // setShowPopup(true); // Show the popup when comments are retrieved
  //   } else {
  //     console.log("Error");
  //   }
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    const commentRequest = {
      postId: postId,
      feedback: comment,
    };
    const response = await executePostCommentForPost(commentRequest);
    if (response.status == 200) {
      console.log("done");
      setComment("")
      
    } else {
      console.log("error");
    }
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div
        ref={popupRef}
        className="bg-white p-4 rounded-lg max-h-80 overflow-y-auto md:h-[80%] w-[80%]"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-lg font-bold mb-4">Comments</h2>
        {comments.length == 0 && (
          <div>
            <h5>No comments right now</h5>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* <input type='text'
         placeholder='Type Feedback...' 
         className='rounded-lg border border-black'
         value={comment}
         onChange={handleInputChange}
         
         /> */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add Comment"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={comment}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-outline-secondary"
              type="submit"
              id="button-addon2"
            >
              Send
            </button>
          </div>
         
        </form>
        {comments.map((comment) => (
          // <div key={comment.id} className="mb-2">
          //   <div className="rounded-lg border border-black  ">
          //     <p>{comment.feedback}</p>
          //   </div>
          // </div>
          <div className="card" key={comment.id}>
  
  <div className="card-body">
    <blockquote className="blockquote mb-0">
      <p>{comment.feedback}.</p>
      
    </blockquote>
  </div>
</div>
        ))}
      </div>
    </div>
  );
};

export default CommentPopup;
