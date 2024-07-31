package com.voyage.voyageapi.notification;

import com.voyage.voyageapi.common.BaseClass;
import com.voyage.voyageapi.user.User;
import com.voyage.voyageapi.userposts.Post;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Notification extends BaseClass {


    private String message;

    private String notificationType;

    @ManyToOne
    @JoinColumn(name="generatedBy_id")
    private User generatedByUser;

    @ManyToOne
    @JoinColumn(name = "generatedFor_id")
    private User generatedForUser;

    @OneToOne
    @JoinColumn(name = "post_id")
    private Post post;

    private Boolean isRead;
}
