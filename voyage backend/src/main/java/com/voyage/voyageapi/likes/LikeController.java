package com.voyage.voyageapi.likes;

import com.voyage.voyageapi.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("likes")
@Tag(name = "Like-api")
public class LikeController {

    private final LikeService likeService;

    @PostMapping
    public ResponseEntity<Integer> saveLikeCount(@Valid @RequestBody List<LikeRequest> request){
        return ResponseEntity.ok(likeService.saveLikeCount(request));
    }

    @DeleteMapping
    public ResponseEntity<Integer> removeLike(@Valid @RequestBody LikeRequest request){
        return ResponseEntity.ok(likeService.removeLike(request));
    }

    @GetMapping("/{post-id}")
    public ResponseEntity<PageResponse<LikeResponse>> getAllLikeForPost(
            @PathVariable("post-id") Integer postId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size
            ){
        return ResponseEntity.ok(likeService.getAllLikesForPost(postId,page,size));
    }

    @GetMapping("/checkLike/{post-id}")
    public ResponseEntity<Boolean> checkLikeForPost(@PathVariable("post-id") Integer postId, Authentication currentUser){
        return ResponseEntity.ok(likeService.checkLikeForPost(postId,currentUser));
    }
}
