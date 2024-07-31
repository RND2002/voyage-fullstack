package com.voyage.voyageapi.notification;

import com.voyage.voyageapi.common.PageResponse;
import com.voyage.voyageapi.user.User;
import com.voyage.voyageapi.userposts.Post;
import com.voyage.voyageapi.userposts.PostRepository;
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
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    //private final PostRepository postRepository;



    public PageResponse<NotificationResponse> getAllNotificationForUser(int page, int size, Authentication currentUser) {
        User user=((User) currentUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Notification> notifications=notificationRepository.findAllByUserId(pageable,user.getId());
        List<NotificationResponse> responses=notifications.stream()
                .map(notificationMapper::toNotificationResponse).toList();
        return new PageResponse<>(
                responses,
                notifications.getNumber(),
                notifications.getSize(),
                notifications.getTotalElements(),
                notifications.getTotalPages(),
                notifications.isFirst(),
                notifications.isLast()
        );
    }

//    public void updateNotification(Notification notification,Integer postId){
//        if(!notificationRepository.findById(postId).isPresent()){
//            saveNotificationToRepository(notification);
//        }else{
//            Notification notification1=notificationRepository.findById(notification.getId()).orElseThrow();
//            notification1.
//        }
//
//
//    }
    public void saveNotificationToRepository(Notification notification){
        notificationRepository.save(notification);
    }
}
