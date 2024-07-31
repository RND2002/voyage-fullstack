package com.voyage.voyageapi.notification;

import org.springframework.stereotype.Service;

@Service
public class NotificationMapper {

    public NotificationResponse toNotificationResponse(Notification notification){
        return NotificationResponse.builder()
                .message(notification.getMessage())
                .notificationType(notification.getNotificationType())
                .generatedById(notification.getGeneratedByUser().getId())
                .build();
    }
}
