package com.voyage.voyageapi.notification;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationResponse {

    private String message;
    private String notificationType;
//    private String generatedFor;
    private Integer generatedById;
}
