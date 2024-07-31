package com.voyage.voyageapi.userposts;

import org.springframework.data.jpa.domain.Specification;

public class PostSpecification {

    public static Specification<Post> withOwnerId(Integer userId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("user").get("id"), userId);
    }
}
