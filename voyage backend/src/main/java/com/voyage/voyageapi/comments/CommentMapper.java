package com.voyage.voyageapi.comments;

import com.voyage.voyageapi.userposts.Post;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class CommentMapper {

    public Comment toComment(CommentRequest request){
        return Comment.builder()
                .feedback(request.feedback())
                .post(Post.builder()
                        .id(request.postId())

                        .build()

                )
                .build();
    }

    public CommentResponse toCommentResponse(Comment comment,Integer id){
        return CommentResponse.builder()
                .feedback(comment.getFeedback())
                .ownFeedback(Objects.equals(comment.getCreatedBy(),id))
                .build();
    }
}
