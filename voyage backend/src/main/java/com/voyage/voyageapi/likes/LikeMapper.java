package com.voyage.voyageapi.likes;

import com.voyage.voyageapi.user.User;
import com.voyage.voyageapi.userposts.Post;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class LikeMapper {

    public Like toLike(LikeRequest request,Integer userId){
        return Like.builder()
                .post(Post.builder()
                        .id(request.postId())
                        .build()
                ).user(User.builder()
                        .id(userId)
                        .build()
                )
                .build();
    }

    public LikeResponse toLikeResponse(Like like) {
        return LikeResponse.builder()
                .userId(like.getUser().getId())
                .build();
    }
}
