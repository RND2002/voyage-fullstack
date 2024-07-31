// export const createLectureApi=(lecture,sectionId,token)=>{
//     return apiClient.post(`sections/${sectionId}/lectures`,lecture,{
//       headers:{
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   }

import { apiClient } from "./ApiClient"

//   export const createSectionApi = (token, courseId, sectionData) => {
//     return apiClient.post(`/courses/${courseId}/sections`, sectionData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   };
// export const getLecturesApi=(token,sectionId)=>{
//   return apiClient.get(`/sections/${sectionId}/lectures`,{
//     headers:{
//       Authorization:`Bearer ${token}`
//     },
//   });
// }  


export const executeGetPostService=()=>{
    return apiClient.get(`/posts`,{
        
    })
}

export const executeGetPostOfUserService=()=>{
    return apiClient.get(`/posts/user`,{

    })
}
export const executePostPostOfUserService=(postRequest)=>{
    return apiClient.post(`/posts`,postRequest,{

    })
}
export const executeCoverUplloadOfPost=(postId,coverRequest)=>{
    return apiClient.post(`posts/cover/${postId}`,coverRequest)
}

export const executeGetPostById=(postId)=>{
    return apiClient.get(`/posts/${postId}`,{

    })
}

export const executeBookMarkPostService=(postId)=>{
    return apiClient.post(`/bookmark/${postId}`,{

    })
}

export const executeGetBookMarkedPost=()=>{
    return apiClient.get(`/bookmark`,{

    })
}

export const executeRemoveBookMarkedPost=(postId)=>{
    return apiClient.post(`/bookmark/${postId}`)
}

export const executeArchivePostStatus=(postId)=>{
    return apiClient.put(`/posts/archive/${postId}`,{

    })
}

export const executeIsPostBookmarked=(postId)=>{
    return apiClient.get(`/bookmark/isPostBookMarked/${postId}`,{})
}
