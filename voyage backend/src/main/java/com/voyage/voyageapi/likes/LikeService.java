package com.voyage.voyageapi.likes;

import com.voyage.voyageapi.common.PageResponse;
import com.voyage.voyageapi.notification.Notification;
import com.voyage.voyageapi.notification.NotificationService;
import com.voyage.voyageapi.user.User;
import com.voyage.voyageapi.user.UserRepository;
import com.voyage.voyageapi.userposts.Post;
import com.voyage.voyageapi.userposts.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final LikeMapper likeMapper;
    private final PostRepository postRepository;
    private final NotificationService notificationService;

    public  Integer removeLike(LikeRequest request) {
        User user=userRepository.findByEmail(request.currentUserEmail()).orElseThrow();
        Like like=likeRepository.findById(user.getId()).orElseThrow();
         likeRepository.delete(like);
        return like.getId();

    }

//    public Integer saveLikeCount(List<LikeRequest> requestList) {
//
//
//        for(LikeRequest request:requestList){
//            User user=userRepository.findByEmail(request.currentUserEmail())
//                    .orElseThrow();
//            User likedUser= likeRepository.findById(user.getId()).orElseThrow().getUser();
//            System.out.println(likedUser);
//            if(likedUser==null){
//                likeRepository.save(likeMapper.toLike(request, user.getId()));
//            }else{
//                return 500;
//            }
//            Notification notification=Notification.builder()
//                    .message(user.getFirstname()+" liked  your post")
//                    .notificationType("alert")
//                    .generatedByUser(user)
//                    .post(postRepository.findById(request.postId()).orElseThrow())
//                    .isRead(false)
//                    .build();
//            notificationService.saveNotificationToRepository(notification);
//        }
//        return 200;
//    }
public Integer saveLikeCount(List<LikeRequest> requestList) {
    for (LikeRequest request : requestList) {
        User user = userRepository.findByEmail(request.currentUserEmail())
                .orElseThrow();
        Post post = postRepository.findById(request.postId())
                .orElseThrow();

        // Check if the user has already liked the post
        Like existingLike = likeRepository.findByUserAndPost(user, post);
        if (existingLike != null) {
            // User has already liked the post, return 500 (or any other appropriate status code)
            return 505;
        }

        // Save the like
        likeRepository.save(likeMapper.toLike(request, user.getId()));

        // Save a notification
//        Notification notification = Notification.builder()
//                .message(user.getFirstname() + " liked your post")
//                .notificationType("alert")
//                .generatedByUser(user)
//                .post(post)
//                .isRead(false)
//                .build();
//        notificationService.saveNotificationToRepository(notification);
    }
    return 200;
}



    public PageResponse<LikeResponse> getAllLikesForPost(Integer postId, int page, int size) {
        Post post=postRepository.findById(postId)
                .orElseThrow(()->new EntityNotFoundException("Post is not found with this post id"+postId));

        Pageable pageable= PageRequest.of(page,size, Sort.by("createdDate").descending());
        Page<Like> likes=likeRepository.findAllByPostId(pageable,postId);
        List<LikeResponse> responseSet=likes.
                stream().
                map(likeMapper::toLikeResponse).toList();
        return new PageResponse<>(
                responseSet,
                likes.getNumber(),
                likes.getSize(),
                likes.getTotalElements(),
                likes.getTotalPages(),
                likes.isFirst(),
                likes.isLast()
        );
    }


    public boolean checkLikeForPost(Integer postId, Authentication currentUser) {
        User user= (User) currentUser.getPrincipal();
        Post post=postRepository.findById(postId).orElseThrow(()->new EntityNotFoundException("\"Post with this id dne\""));
        Like like=likeRepository.findByUserAndPost(user,post);
        return like != null;

    }
}
