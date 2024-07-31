import { apiClient } from "./ApiClient"

export const executePostLikeApiService=(likeRequest)=>{
    return apiClient.post('/likes',likeRequest,{

    })
}

export const executeDislikeApiService=(likeRequest)=>{
    return apiClient.delete('/likes',likeRequest,{

    })
}

export const executeCheckLikeApiService=(postId)=>{
    return apiClient.get(`/likes/checkLike/${postId}`,{
        
    })
}