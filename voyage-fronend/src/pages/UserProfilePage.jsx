import React, { useEffect, useState } from 'react'
import { executeGetPostOfUserService } from '../api/PostApiService'
import BlogCard from '../component/BlogCard'
import UserPost from '../component/UserPost'

const UserProfilePage = () => {
    const [userPosts,setUserPosts]=useState([])

    // async function retreivePostOfUser(){
    //     const response=await executeGetPostOfUserService()
    //     if(response.status===200){
    //       console.log(response.data)
    //       setUserPosts(response.data.content)
    //     }else{
    //       console.log("error")
    //     }
    //   }
    
    //   useEffect(()=>{
    //     retreivePostOfUser()
    //   },[])
  return (
    <div>
        <UserPost/>
    </div>
    ))}
  </div>
  
  )
}

export default UserProfilePage

