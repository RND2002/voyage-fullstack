package com.voyage.voyageapi.notification;

import com.voyage.voyageapi.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Service
@Tag(name = "Notification")
@RestController
@RequestMapping("notification")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<PageResponse<NotificationResponse>> getAllNotificationForUser(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication currentUser
            ){
        return ResponseEntity.ok(notificationService.getAllNotificationForUser(page,size,currentUser));
    }
}
