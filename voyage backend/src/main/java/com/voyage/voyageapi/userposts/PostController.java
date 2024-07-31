package com.voyage.voyageapi.userposts;

import com.voyage.voyageapi.common.PageResponse;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("posts")
@RequiredArgsConstructor
@Tag(name="Posts-API")
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<Integer> savePost(
            @Valid @RequestBody PostRequest post,
            Authentication currentUser
    ){
        return ResponseEntity.ok(postService.savePost(post,currentUser));
    }

    @GetMapping("/{post-id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable("post-id") Integer postId){
        return ResponseEntity.ok(postService.getPostById(postId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<PostResponse>> getAllPost(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication currentUser
    ){
            return ResponseEntity.ok(postService.getAllPost(page,size,currentUser));
    }


//    @PutMapping("/bookMark/{postId}")
//    public ResponseEntity<Integer> bookMarkPage(@PathVariable Integer postId,Authentication currUser){
//        return ResponseEntity.ok(postService.bookMarkPage(postId,currUser));
//    }

//    @GetMapping("bookMarkedPost")
//    public ResponseEntity<PageResponse<PostResponse>> getAllBookMarkedPostOfUser(
//            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
//            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
//            Authentication currentUser){
//        return ResponseEntity.ok(postService.getAllBookMarkedPost(page,size,currentUser));
//    }

//    @PutMapping("removeBookMark/{postId}")
//    public ResponseEntity<Integer> removeFromBookMark(@PathVariable  Integer postId,Authentication currentUser){
//        return  ResponseEntity.ok(postService.removePostFromBookMark(postId,currentUser));
//    }

//    @GetMapping("/isBookMarked")
//    public ResponseEntity<Boolean> isBookMarkedByUser(Authentication currentUser){
//        return ResponseEntity.ok(postService.checkIsBookMarked(currentUser));
//    }

    @GetMapping("user")
    public ResponseEntity<PageResponse<PostResponse>> getAllPostOfUser(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication currentUser
    ){

        return ResponseEntity.ok(postService.getAllPostOfUser(page,size,currentUser));
    }

    @PutMapping("/archive/{post-id}")
    public ResponseEntity<Integer> updateArchiveStatus(
            @PathVariable("post-id") Integer postId,
            Authentication currentUser
    ){
        return ResponseEntity.ok(postService.updateArchiveStatus(postId,currentUser));
    }

    @PostMapping(value = "/cover/{post-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadPostCover(
            @PathVariable("post-id") Integer postId,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser
    ){
        postService.uploadPostCoverPicture(file, connectedUser, postId);
        return ResponseEntity.accepted().build();
    }

}
