package com.voyage.voyageapi.userposts;

import com.voyage.voyageapi.common.PageResponse;
import com.voyage.voyageapi.exception.OperationNotPermittedException;
import com.voyage.voyageapi.file.FileStorageService;
import com.voyage.voyageapi.notification.NotificationRepository;
import com.voyage.voyageapi.user.User;
import com.voyage.voyageapi.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Objects;

import static com.voyage.voyageapi.userposts.PostSpecification.withOwnerId;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final FileStorageService fileStorageService;
    private final UserRepository userRepository;
    public Integer savePost(PostRequest post, Authentication currentUser) {

        User user= (User) currentUser.getPrincipal();
        Post toPost=postMapper.toPost(post);
        toPost.setUser(user);
        return postRepository.save(toPost).getId();
    }

    public PostResponse getPostById(Integer postId) {
        return postRepository.findById(postId).map(postMapper::toPostResponse)
                .orElseThrow(()->new EntityNotFoundException("Post does not exist with id"));
    }

    public PageResponse<PostResponse> getAllPost(int page, int size, Authentication currentUser) {
        User user= (User) currentUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Post> posts = postRepository.findAllDisplayablePosts(pageable, user.getId());
        List<PostResponse> postResponses=posts
                .stream()
                .map(postMapper::toPostResponse)
                .toList();
        return new PageResponse<>(
                postResponses,
                posts.getNumber(),
                posts.getSize(),
                posts.getTotalElements(),
                posts.getTotalPages(),
                posts.isFirst(),
                posts.isLast()
        );

    }

    public PageResponse<PostResponse> getAllPostOfUser(int page, int size, Authentication currentUser) {
        User user= (User) currentUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Post> posts = postRepository.findAll(withOwnerId(user.getId()), pageable);

        List<PostResponse> postResponses=posts
                .stream()
                .map(postMapper::toPostResponse)
                .toList();
        return new PageResponse<>(
                postResponses,
                posts.getNumber(),
                posts.getSize(),
                posts.getTotalElements(),
                posts.getTotalPages(),
                posts.isFirst(),
                posts.isLast()
        );

    }

    public Integer updateArchiveStatus(Integer postId, Authentication currentUser) {
        User user= (User) currentUser.getPrincipal();
        Post post=postRepository.findById(postId)
                .orElseThrow(()->new EntityNotFoundException("No post found with this post id ::"+postId));
        if (!Objects.equals(post.getUser().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot update others books archived status");
        }
        post.setIsVisible(!post.getIsVisible());
        postRepository.save(post);
        return postId;
    }

    public void uploadPostCoverPicture(MultipartFile file, Authentication connectedUser, Integer postId) {
        Post post=postRepository.findById(postId)
                .orElseThrow(()->new EntityNotFoundException("Post is not found with this id::"+postId));
        User user = ((User) connectedUser.getPrincipal());
        var postPicture = fileStorageService.saveFile(file, postId, user.getId());
        post.setPostCover(postPicture);
        postRepository.save(post);
    }

//    public Integer bookMarkPage(Integer postId, Authentication currUser) {
//        Post post=postRepository.findById(postId).
//                orElseThrow(()->new EntityNotFoundException("Post is not found with this id"));
//
//        User user=((User)currUser.getPrincipal());
//
//        List<Post> bookMarkedPostList=postRepository.findAllByBookmarkedUser(user.getId());
//
//        Post newPost=new Post();
//
//        newPost.setUser(post.getUser());
//        newPost.setPostCover(post.getPostCover());
//        newPost.setIsSaved(true);
//        newPost.setComments(post.getComments());
//        newPost.setIsVisible(post.getIsVisible());
//        newPost.setDescription(post.getDescription());
//        newPost.setIsDeleted(post.getIsDeleted());
//        newPost.setTags(post.getTags());
//        newPost.setTitle(post.getTitle());
//        newPost.setCreatedDate(post.getCreatedDate());
//        newPost.setId(post.getId());
//        newPost.setLastModifiedDate(post.getLastModifiedDate());
//        bookMarkedPostList.add(newPost);
//        postRepository.save(newPost);
//
//        postRepository.save(newPost);
//        return post.getId();
//    }


//    public PageResponse<PostResponse> getAllBookMarkedPost(int page,int size,Authentication currentUser) {
//        User user=((User) currentUser.getPrincipal());
//        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
//        Page<Post> posts = postRepository.findAllBookmarkedPostForUser(user.getId(), pageable);
//        System.out.println(posts);
//        List<PostResponse> postResponses=posts
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

    public Integer removePostFromBookMark(Integer postId, Authentication currentUser) {

        User user= ((User) currentUser.getPrincipal());
        Post post=postRepository.findById(postId).
                orElseThrow(()->new EntityNotFoundException("Post not found with this id"));
        Post newPost=new Post();
        newPost.setUser(user);
        newPost.setPostCover(post.getPostCover());

        newPost.setComments(post.getComments());
        newPost.setIsVisible(post.getIsVisible());
        newPost.setDescription(post.getDescription());
        newPost.setIsDeleted(post.getIsDeleted());
        newPost.setTags(post.getTags());
        newPost.setTitle(post.getTitle());
        newPost.setCreatedDate(post.getCreatedDate());
        newPost.setId(post.getId());
        newPost.setLastModifiedDate(post.getLastModifiedDate());
        postRepository.save(newPost);
        return postId;
    }

//    public Boolean checkIsBookMarked(Authentication currentUser) {
//        User user=((User) currentUser.getPrincipal());
//
//    }
}
