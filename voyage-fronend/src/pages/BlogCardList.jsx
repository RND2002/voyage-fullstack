// BlogCardList.js

import { useEffect, useState } from 'react';
import { executeGetPostService } from '../api/PostApiService';
import { useAuth } from '../auth/AuthContext';
import BlogCard from '../component/BlogCard';


const BlogCardList = () => {
  // Dummy array of data for cards
  const dummyData = [
    { id: 1, author: 'John Doe', title: 'The Impact of Climate Change', date: 'April 14, 2024', image: 'https://4.bp.blogspot.com/-9hkF3xBSvm4/W-KB-XJpx8I/AAAAAAAAArU/JBh7iW3QcwIiaPUh_NDR75-4Cq0v_TgZwCLcBGAs/s1600/Image-of-Tom-Cruise.jpg' },
    { id: 2, author: 'Jane Smith', title: 'Exploring Renewable Energy Sources', date: 'April 15, 2024', image: 'https://th.bing.com/th/id/OIP.COIvX3HRYQpJd6JUM01FRQAAAA?w=309&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
    { id: 3, author: 'Alex Johnson', title: 'Urbanization and Its Effects on Wildlife', date: 'April 16, 2024', image: 'https://th.bing.com/th/id/OIP.COIvX3HRYQpJd6JUM01FRQAAAA?w=309&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
    { id: 4, author: 'Emily Brown', title: 'The Future of Space Exploration', date: 'April 17, 2024', image: 'https://th.bing.com/th/id/OIP.COIvX3HRYQpJd6JUM01FRQAAAA?w=309&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
  ];

  const [blogArray,setBlogArray]=useState([])

  const authContext=useAuth()
  async function getFeedPost(){
    const response=await executeGetPostService(authContext.token)
    setBlogArray(response.data.content)
    console.log(response.data.content)
  }
  useEffect(()=>{
    getFeedPost()
  },[])

  return (
  <div className='container '>
      <div className="row mb-2">
    <div className='col-md-6'>
    {dummyData.map((item) => (
      item.author && <BlogCard key={item.id} author={item.author} title={item.title} date={item.date} image={item.image} />
    ))}
    </div>
  </div>
  </div>
  

  );
};

export default BlogCardList;
