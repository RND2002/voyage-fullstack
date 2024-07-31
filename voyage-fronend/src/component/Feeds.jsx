import { MdOutlineInsertComment } from "react-icons/md";
import { useEffect, useState } from "react";
import { executeBookMarkPostService, executeGetPostService, executeIsPostBookmarked, executeRemoveBookMarkedPost } from "../api/PostApiService";
import { executeGetCommentOfPost } from "../api/CommentApiService";
import { FaRegBookmark } from "react-icons/fa";
import AuthenticatedNavbar from "./AuthenticatedNavbar";
import CommentPopup from "./CommentPopup";
import Loader from "./Loader";
import { GoBookmarkSlash } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";

const Feeds = () => {
  const [feeds, setFeeds] = useState([]);
  const [comments, setComments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [loader, setLoader] = useState(true);
  const [savedStatus, setSavedStatus] = useState({});
  const [isSavedByUser,setSavedByUser]=useState(false)

  async function retrievePost() {
    const response = await executeGetPostService();
    if (response.status === 200) {

      console.log(response.data.content);
      setFeeds(response.data.content);
      setLoader(false);
      
    } else {
      console.log("error");
    }
  }

  async function retrieveCommentOfPost(postId) {
    const response = await executeGetCommentOfPost(postId);
    if (response.status === 200) {
      console.log(response.data.content)
      setComments(response.data.content);
      setShowPopup(true);
    } else {
      console.log("Error");
    }
  }


  async function isPostBookMarkedCheck(postId){
    const response=executeIsPostBookmarked(postId)
    if(response.status===200){
      setSavedByUser(response.data)
    }else{
      console.log("error")
    }
  }

  async function bookMarkPost(postId) {
    const response = await executeBookMarkPostService(postId)
    if (response.status === 200) {
      setSavedStatus(prevState => ({
        ...prevState,
        [postId]: !prevState[postId] // Toggle saved status for the specific post
      }));
      
      console.log(response.data)
    } else {
      console.log("error")
    }
  }

  // async function removeBookMarkFromPost(postId){
  //   try{
  //     const response=executeRemoveBookMarkedPost(postId)
  //     if(response.status===200){
  //       console.log("done")
  //     }
  //   }catch(error){
  //     console.log(error)
  //   }
    
  // }

  const navigate = useNavigate();

  useEffect(() => {
    retrievePost();
  }, []);

  return (
    <>
      <AuthenticatedNavbar />
      <div className="nav-scroller py-1 mb-3 border-bottom container"></div>
      <div className=" container">
        {/* Your navigation links */}
      </div>
      {loader && (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}
      <div className="container mt-5">
        <center><h3>All Posts</h3></center>
        <div className="row mb-2">
          {feeds.map((post, index) => (
            <div key={index} className="col-md-6 mb-2">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary-emphasis">
                    World
                  </strong>
                  <h3 className="mb-0">{post.title}</h3>
                  <div className="mb-1 text-body-secondary">Nov 12</div>
                  <p className="card-text mb-auto">{post.description.split(' ').slice(0, 20).join(' ')}</p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span onClick={() => navigate(`/blog/${post.id}`)} className="text-green-400 text-xl font-bold underline cursor-pointer">Continue Reading</span>
                    <MdOutlineInsertComment type="button"
                      onClick={() => {
                        console.log("Comment button clicked");
                        setSelectedPostId(post.id);
                        retrieveCommentOfPost(post.id);
                      }}
                      className="cursor-pointer"
                      size={28}
                    />
                    {/* {savedStatus[post.id] === false ||  isSavedByUser===false ? (
                      <FaRegBookmark className="cursor-pointer" onClick={() => bookMarkPost(post.id)} size={28} />
                    ) : (
                      <GoBookmarkSlash onClick={()=>removeBookMarkFromPost(post.id)} size={28} className="cursor-pointer" />
                    )} */}
                    {savedStatus[post.id] === false ||  isSavedByUser===false && (
                      <FaRegBookmark className="cursor-pointer" onClick={() => bookMarkPost(post.id)} size={28} />
                   ) }
                  </div>
                </div>
                <div className="col-auto d-none d-lg-block">
                  <img className="bd-placeholder-img" width="200" height="100%" src={`data:image/jpeg;base64,${post.postCover}`} />
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

export default Feeds;
