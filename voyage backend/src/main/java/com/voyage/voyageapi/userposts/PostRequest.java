package com.voyage.voyageapi.userposts;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.Set;

public record PostRequest(

        Integer id,

        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String title,
        @NotNull(message = "101")
        @NotEmpty(message = "101")
        String description,
        @NotNull(message = "102")
        @NotEmpty(message = "102")
        List<String> tags,

        boolean isVisible,
        boolean isDeleted


) {
}
