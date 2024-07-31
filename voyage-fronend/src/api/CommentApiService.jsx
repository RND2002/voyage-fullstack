import { apiClient } from "./ApiClient"

export const executeGetCommentOfPost=(postId)=>{
    return apiClient.get(`comments/post/${postId}`,{

    })
}

export const executePostCommentForPost=(commentRequest)=>{
    return apiClient.post(`comments`,commentRequest,{

    })
}