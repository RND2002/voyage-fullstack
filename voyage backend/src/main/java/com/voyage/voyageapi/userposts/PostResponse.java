package com.voyage.voyageapi.userposts;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostResponse {
    private Integer id;
    private String title;
    private String description;
    private byte[] postCover;
    private List <String> tags;
    private Boolean isVisible;
    private Boolean isDeleted;

    private LocalDateTime createdAt;
}
