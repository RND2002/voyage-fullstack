package com.voyage.voyageapi.comments;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponse {
    private String feedback;
    private boolean ownFeedback;
}
