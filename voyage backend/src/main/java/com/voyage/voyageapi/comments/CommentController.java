package com.voyage.voyageapi.comments;

import com.voyage.voyageapi.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("comments")
@RequiredArgsConstructor
@Tag(name = "Comments")
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Integer> saveComment(
            @Valid @RequestBody CommentRequest request, Authentication currentUser
            ){
        return ResponseEntity.ok(commentService.saveComment(request,currentUser));
    }

    @GetMapping("/post/{post-id}")
    public ResponseEntity<PageResponse<CommentResponse>> getAllCommentForPost(
            @PathVariable("post-id") Integer postId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication currentUser
    ){
        return ResponseEntity.ok(commentService.getAllCommentForPost(postId,page,size,currentUser));
    }
}
