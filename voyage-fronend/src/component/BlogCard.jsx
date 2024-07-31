// BlogCard.js

// import { FaRegBookmark } from "react-icons/fa";
// import { FiHeart } from "react-icons/fi";
// import { FcLike } from "react-icons/fc";
// import { MdOutlineInsertComment } from "react-icons/md";
// import { CiHeart } from "react-icons/ci";
import PropTypes from "prop-types";
// import { useState } from "react";
const BlogCard = ({ author, title, date, image }) => {
  // const [like, setLike] = useState(false);
  return (
    
   
   
      
        <div>
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative col-span-2">
          <div className="col p-4 d-flex flex-column position-static ">
            <strong className="d-inline-block mb-2 text-primary-emphasis">
              {author}
            </strong>
            <h3 className="mb-0">{title}</h3>
            <div className="mb-1 text-body-secondary">{date}</div>
            <p className="card-text mb-auto">{title}</p>
            <a
              href="#"
              className="icon-link gap-1 icon-link-hover stretched-link"
            >
              Continue reading
              <svg className="bi"><use xlink:href="#chevron-right"></use></svg>
              
            </a>
          </div>
          <div className="col-auto d-none d-lg-block">
          
            <img  className="bd-placeholder-img"
              width="200"
              height="250" src={image}/>
          </div>
        </div>
        </div>
      
      
    
   
    
  );
};
BlogCard.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default BlogCard;
