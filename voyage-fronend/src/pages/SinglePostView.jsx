
import React, { useEffect, useState } from "react";
import { executeGetPostById } from "../api/PostApiService";
import { useParams } from "react-router-dom";
import AuthenticatedNavbar from "../component/AuthenticatedNavbar";
import Loader from "../component/Loader";
import { executeGetCommentOfPost, executePostCommentForPost } from "../api/CommentApiService";

const SinglePostView = () => {
  const [postData, setPostData] = useState(null);

  const [comments, setComments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [loader, setLoader] = useState(true);
  const [comment, setComment] = useState("");

  function handleInputChange(e) {
    setComment(e.target.value);
  }
  const postId = useParams().id;
  console.log(postId);
  useEffect(() => {
    const retrievePostById = async () => {
      try {
        console.log(postId);
        const response = await executeGetPostById(postId);
        if (response.status === 200) {
          console.log(response.data);
          setPostData(response.data);
          setSelectedPostId(response.data.id)
          setLoader(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (postId) {
      retrievePostById();
    }
  }, [postId]);

  async function handleSubmit(e) {
    e.preventDefault();
    const commentRequest = {
      postId: selectedPostId,
      feedback: comment,
    };
    console.log(commentRequest)
    const response = await executePostCommentForPost(commentRequest);
    if (response.status == 200) {
      console.log("done");
      setComment("")
      retrieveCommentOfPost(selectedPostId)
    } else {
      console.log("error");
    }
  }
  async function retrieveCommentOfPost(postId) {
    const response = await executeGetCommentOfPost(postId);
    if (response.status === 200) {
      setComments(response.data.content);
      setShowPopup(true); // Show the popup when comments are retrieved
    } else {
      console.log("Error");
    }
  }

  useEffect(()=>{
    retrieveCommentOfPost(postId)
  },[])

  return (
    <>
      <AuthenticatedNavbar />
      <div className="nav-scroller py-1 mb-3 border-bottom container"></div>
      {loader && (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}

      <div className="container py-4">
        {postData && (
          <div key={postData.id}>
            <div className="row">
              <div className="col-lg-8">
                {/* Post header */}
                <header className="mb-4">
                  {/* Post title */}
                  <h1 className="fw-bolder mb-1">{postData.title}</h1>
                  {/* Post meta content */}
                  <p className="text-muted fst-italic mb-2">
                    Posted on January 1, {postData.createdDate}
                  </p>
                  {/* Post categories */}
                  <div>
                    <a
                      className="badge bg-secondary text-decoration-none link-light me-1"
                      href="#!"
                    >
                      Web Design
                    </a>
                    <a
                      className="badge bg-secondary text-decoration-none link-light"
                      href="#!"
                    >
                      Freebies
                    </a>
                  </div>
                </header>
                {/* Preview image */}
                <figure className="mb-4">
                  <img
                    className="img-fluid rounded"
                    src={`data:image/jpeg;base64,${postData.postCover}`}
                    alt="..."
                  />
                </figure>
                {/* Post content */}
                <section className="mb-5">
                  <p className="fs-5 mb-4">{postData.description}</p>
                </section>
                {/* Comments section */}
                <section className="mb-5">
                  <div className="card bg-light">
                    <div className="card-body">
                      {/* Comment form */}
                      <form className="mb-4" onSubmit={handleSubmit}>
                        <input 
                          className="form-control"
                          rows="3"
                          placeholder="Join the discussion and leave a comment!"
                          value={comment}
         onChange={handleInputChange}
                        />
                        <center><button className="mt-2 btn btn-primary " type="submit">Post</button></center>
                      </form>
                      {/* Comment with nested comments */}
                      <div className="d-flex mb-4">
                       
                      </div>
                      {/* Single comment */}
                      <div className="d-flex">
                         {/* Add comment elements here */}
                         {comments.map((comment) => (
                         
                         <div className="card" key={comment.id}>
                           <div className="card-body">
                             <blockquote className="blockquote mb-0">
                               <p>{comment.feedback}.</p>
                             </blockquote>
                           </div>
                         </div>
                       ))}
                        {/* Add single comment elements here */}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              {/* Side widgets */}
              <div className="col-lg-4">
                {/* Search widget */}
                <div className="card mb-4">
                  <div className="card-header">Search</div>
                  <div className="card-body">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter search term..."
                        aria-label="Enter search term..."
                        aria-describedby="button-search"
                      />
                      <button
                        className="btn btn-primary"
                        type="submit"
                        id="button-search"
                      >
                        Go!
                      </button>
                    </div>
                  </div>
                </div>
                {/* Categories widget */}
                <div className="card mb-4">
                  <div className="card-header">Categories</div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <a href="#!">Web Design</a>
                          </li>
                          {/* Add other category links here */}
                        </ul>
                      </div>
                      <div className="col-sm-6">
                        <ul className="list-unstyled mb-0">
                          {/* Add other category links here */}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Side widget */}
                <div className="card mb-4">
                  <div className="card-header">Side Widget</div>
                  <div className="card-body">
                    <p>
                      You can put anything you want inside of these side
                      widgets. They are easy to use, and feature the Bootstrap 5
                      card component!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Footer */}
       
      </div>
    </>
  );
};

export default SinglePostView;
