package com.voyage.voyageapi.bookmarks;

import com.voyage.voyageapi.common.PageResponse;
import com.voyage.voyageapi.userposts.PostResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("bookmark")
@RequiredArgsConstructor
public class BookMarkController {

    private final BookMarkService bookMarkService;
    @PostMapping("/{postId}")
    public ResponseEntity<Integer> bookMarkPost(@PathVariable Integer postId, Authentication currentUser){
        return ResponseEntity.ok(bookMarkService.bookmarkPost(postId,currentUser));
    }
    @GetMapping
    public ResponseEntity<PageResponse<PostResponse>> getBookmarkedPostOfUser(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication currentUser
    ){
        return ResponseEntity.ok(bookMarkService.getBookmarkedPostOfUser(page,size,currentUser));
    }

    @GetMapping("isPostBookMarked/{postId}")
    public ResponseEntity<Boolean> isPostBookMarked(@PathVariable Integer postId,Authentication currentUser){
        return ResponseEntity.ok(bookMarkService.isPostBookMarked(postId,currentUser));
    }
}
