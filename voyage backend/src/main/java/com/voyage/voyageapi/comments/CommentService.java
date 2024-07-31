package com.voyage.voyageapi.comments;

import com.voyage.voyageapi.common.PageResponse;
import com.voyage.voyageapi.exception.OperationNotPermittedException;
import com.voyage.voyageapi.notification.Notification;
import com.voyage.voyageapi.notification.NotificationService;
import com.voyage.voyageapi.user.User;
import com.voyage.voyageapi.userposts.Post;
import com.voyage.voyageapi.userposts.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final CommentMapper commentMapper;
    private final NotificationService notificationService;
    public Integer saveComment(CommentRequest request, Authentication currentUser) {

        Post post=postRepository.findById(request.postId())
                .orElseThrow(()->new EntityNotFoundException("Post does not exist with id ::"+request.postId()));

        if(post.getIsVisible()==false || post.getIsDeleted()==true){
            throw new OperationNotPermittedException("Comments can not be added for this particular post because it is deleted or archived");

        }
        User user= (User) currentUser.getPrincipal();

//        if(Objects.equals(post.getUser().getId(),user.getId())){
//            throw
//        }
        Comment comment=commentMapper.toComment(request);
        comment.setUser(user);
         commentRepository.save(comment);
//        Notification notification=Notification.builder()
//                .message(user.getFirstname()+" commented on your post")
//                .notificationType("alert")
//                .generatedByUser(user)
//                .post(post)
//                .isRead(false)
//                .build();
//        notificationService.saveNotificationToRepository(notification);
       return post.getId();

    }

    @Transactional
    public PageResponse<CommentResponse> getAllCommentForPost(
            Integer postId,
            int page,
            int size,
            Authentication currentUser) {
        Pageable pageable= PageRequest.of(page,size);
        User user =((User) currentUser.getPrincipal());
        Page<Comment> comments=commentRepository.findAllByPostId(postId,pageable);
        List<CommentResponse> responses=comments.stream()
                .map(c->commentMapper.toCommentResponse(c,user.getId()))
                .toList();

        return new PageResponse<>(
                responses,
                comments.getNumber(),
                comments.getSize(),
                comments.getTotalElements(),
                comments.getTotalPages(),
                comments.isFirst(),
                comments.isLast()
        );
    }
}
