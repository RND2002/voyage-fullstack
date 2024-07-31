package com.voyage.voyageapi.userposts;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Integer>, JpaSpecificationExecutor<Post> {

    @Query("""
            SELECT post
            FROM Post post
            WHERE post.isVisible = true
            AND post.isDeleted = false
            AND post.user.id != :userId
            """)
    Page<Post> findAllDisplayablePosts(Pageable pageable, Integer userId);




}
