package com.voyage.voyageapi.likes;

import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record LikeRequest(

        @NotNull(message = "301")
        @Nonnull
        Integer postId,
        @NotNull(message = "302")
        @NotEmpty(message = "302")
        @NotBlank(message = "302")
        String currentUserEmail
) {
}
