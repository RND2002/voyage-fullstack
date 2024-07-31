
import React, { useEffect, useState } from 'react';
import { executeArchivePostStatus, executeGetPostOfUserService } from '../api/PostApiService';
import { executeGetCommentOfPost } from '../api/CommentApiService';
import { FaRegBookmark } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { FcLike } from 'react-icons/fc';
import { MdOutlineInsertComment } from 'react-icons/md';
import CommentPopup from './CommentPopup'; // Import the CommentPopup component
import AuthenticatedNavbar from './AuthenticatedNavbar';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
const UserPost = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [archivedStatus, setArchivedStatus] = useState({});
  const [comments, setComments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [loader,setLoader]=useState(true)
  async function retrievePostOfUser() {
    const response = await executeGetPostOfUserService();
    if (response.status === 200) {
      setUserPosts(response.data.content);
      setLoader(false)
      // Initialize likedPosts array with false for each post
      // setLikedPosts(new Array(response.data.content.length).fill(false));
    } else {
      console.log('Error');
    }
  }

  async function retrieveCommentOfPost(postId) {
    const response = await executeGetCommentOfPost(postId);
    if (response.status === 200) {
      setComments(response.data.content);
      setShowPopup(true); // Show the popup when comments are retrieved
    } else {
      console.log('Error');
    }
  }

  async function archivePostOfUser(postId){
    const response=await executeArchivePostStatus(postId)
    if(response.status===200){
      setArchivedStatus(prevState => ({
        ...prevState,
        [postId]:  !prevState[postId]
      }));
      retrievePostOfUser()
    }else{
      console.log("error")
    }
  }

  // function toggleLikeEvent(index) {
  //   setLikedPosts(prevLikedPosts => {
  //     const newLikedPosts = [...prevLikedPosts];
  //     newLikedPosts[index] = !newLikedPosts[index];
  //     return newLikedPosts;
  //   });
  // }

  useEffect(() => {
    retrievePostOfUser();
  }, []);

  const navigate=useNavigate()
  return (
    <>
    {/* <AuthenticatedNavbar /> */}
    {loader && (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    )}
    <div className="container mt-5">
     
      <div className="row mb-2">
        {userPosts.map((post, index) => (
          
          <div key={index} className="col-md-6 mb-2">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
              <div key={post.id}>
                <strong className="d-inline-block mb-2 text-primary-emphasis">
                  World
                </strong>
                <h3 className="mb-0">{post.title}</h3>
                <div className="mb-1 text-body-secondary">Nov 12</div>
                <p className="card-text mb-auto">{post.description.split(' ').slice(0, 10).join(' ')}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
            
                <span onClick={()=>navigate(`/blog/${post.id}`)} className="text-green-400 text-xl font-bold underline cursor-pointer">Continue Reading</span>
                  <MdOutlineInsertComment type="button"
                    onClick={() => {
                      console.log("Comment button clicked");
                      setSelectedPostId(post.id);
                      retrieveCommentOfPost(post.id);
                    }}
                    className="cursor-pointer"
                    size={28}
                  />
               
               
                  <FaRegBookmark size={28} />
                
              
                {archivedStatus[post.id] === true ||  post.isVisible===true ? (
                      <FaEye  className="cursor-pointer" onClick={() =>archivePostOfUser(post.id)} size={28}  />
                    ) : (
                      <IoMdEyeOff  onClick={() =>archivePostOfUser(post.id)} size={28} className="cursor-pointer" />
                    )}
              </div>
              </div>
              </div>
              <div className="col-auto d-none d-lg-block">
               
                <img  className="bd-placeholder-img"
            width="200"
            height="100%" src={`data:image/jpeg;base64,${post.postCover}`}/>
              </div>
            </div>
          </div>
         
        ))}
       {showPopup && (
      <CommentPopup
      
        postId={selectedPostId}
        comments={comments}
        onClose={() => setShowPopup(false)}
      />
    )}
      </div>  
    </div>
  </>
  );
};

export default UserPost;
