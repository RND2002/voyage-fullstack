package com.voyage.voyageapi.userposts;

import com.voyage.voyageapi.file.FileUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostMapper {

    public Post toPost(PostRequest request){
        return Post.builder()
                .id(request.id())
                .title(request.title())
                .description(request.description())
                .tags(request.tags())
                .isVisible(true)
                .isDeleted(false)

                .build();
    }

    public PostResponse toPostResponse(Post post) {
        return PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .description(post.getDescription())
                .postCover(FileUtils.readFileFromLocation(post.getPostCover()))

                //.postCover(post.getPostCover())
                .tags(post.getTags())
                .isVisible(post.getIsVisible())
                .isDeleted(post.getIsDeleted())

                .createdAt(post.getCreatedDate())
                .build();
    }

    public List<PostResponse> toPostResponses(List<Post> posts) {
        List<PostResponse> responses=new ArrayList<>();
        for(Post post:posts){
            responses.add(toPostResponse(post));
        }
        return responses;
    }
}
