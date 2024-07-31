package com.voyage.voyageapi.bookmarks;

import com.voyage.voyageapi.common.PageResponse;
import com.voyage.voyageapi.user.User;
import com.voyage.voyageapi.userposts.Post;
import com.voyage.voyageapi.userposts.PostMapper;
import com.voyage.voyageapi.userposts.PostRepository;
import com.voyage.voyageapi.userposts.PostResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookMarkService {

    private final BookMarkRepository bookMarkRepository;
    private final PostRepository postRepository;
    private final PostMapper postMapper;


    //    public Integer bookMarkPost(Integer postId, Authentication currentUser) {
//
//        User user=((User) currentUser.getPrincipal());
//        Post post=postRepository.findById(postId).orElseThrow(()->new EntityNotFoundException("Post not found with this id"));
//        Optional<BookMark> ifExistingBookMark=bookMarkRepository.findById(user.getId());
//        if(ifExistingBookMark.isPresent()){
//            ifExistingBookMark.get().getPostIds().add(post.getId());
//            bookMarkRepository.save(ifExistingBookMark.get());
//        }else{
//            BookMark newBookMark=new BookMark();
//            newBookMark.setUser(user);
//            List<Integer> posts=new ArrayList<>();
//            posts.add(post.getId());
//            newBookMark.setPostIds(posts);
//            bookMarkRepository.save(newBookMark);
//            System.out.println("done");
//        }
//     return post.getId();
//    }
    public Integer bookmarkPost(Integer postId, Authentication currentUser) {
        User user = ((User) currentUser.getPrincipal());

        // Find the post by its ID or throw an exception if not found
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with this ID: " + postId));

        // Find the user's existing bookmark, if any
        BookMark bookmark = bookMarkRepository.findById(user.getId())
                .orElseThrow();

        // Add the post ID to the user's bookmarked posts
        bookmark.getPostIds().add(postId);
        bookmark.setUser(user);
        bookmark.setCreatedDate(LocalDateTime.now());

        System.out.println("done");
        // Save the bookmark
        bookMarkRepository.save(bookmark);

        return postId;
    }

//    public PageResponse<PostResponse> getBookmarkedPostOfUser(int page, int size, Authentication currentUser) {
//        User user = ((User) currentUser.getPrincipal());
//        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
//        Page<BookMark> bookMarkPage = bookMarkRepository.findAllBookmarkedPostForUser(user.getId(), pageable);
//        Page<Post> posts = new ArrayList<>();
//        for (BookMark bookMark : bookMarkPage) {
//            Post post = postRepository.findById(bookMark.getId()).orElseThrow(() -> new EntityNotFoundException("DNE"));
//            posts.add(post);
//        }
//        List<PostResponse> postResponses = posts
//                .stream()
//                .map(postMapper::toPostResponse)
//                .toList();
//        return new PageResponse<>(
//                postResponses,
//                posts.getNumber(),
//                posts.getSize(),
//                posts.getTotalElements(),
//                posts.getTotalPages(),
//                posts.isFirst(),
//                posts.isLast()
//        );
//    }
public PageResponse<PostResponse> getBookmarkedPostOfUser(int page, int size, Authentication currentUser) {
    User user = ((User) currentUser.getPrincipal());
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
    Page<BookMark> bookmarkPage = bookMarkRepository.findAllBookmarkedPostForUser(user.getId(), pageable);


    List<PostResponse> postResponses=new ArrayList<>();
    List<Post> posts=new ArrayList<>();
    for(BookMark bookMark:bookmarkPage){
        posts = postRepository.findAllById(bookMark.getPostIds());
        System.out.println(posts.get(0).getUser().fullName());

    }
    for (Post post:posts){
        postResponses.add(postMapper.toPostResponse(post));
    }



//    System.out.println(postResponses);

    return new PageResponse<>(
            postResponses,
            bookmarkPage.getNumber(),
            bookmarkPage.getSize(),
            bookmarkPage.getTotalElements(),
            bookmarkPage.getTotalPages(),
            bookmarkPage.isFirst(),
            bookmarkPage.isLast()
    );
}


    public Boolean isPostBookMarked(Integer postId, Authentication currentUser) {
        User user=((User) currentUser.getPrincipal());
        Post post=postRepository.findById(postId).orElseThrow(()->new EntityNotFoundException("Post not found with id"));
        BookMark bookMark=user.getBookMark();
        return bookMark.getPostIds().contains(postId);
    }
}




