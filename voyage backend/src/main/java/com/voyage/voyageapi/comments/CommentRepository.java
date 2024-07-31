package com.voyage.voyageapi.comments;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Integer> {

    @Query("""
            SELECT comment
            FROM Comment  comment
            WHERE comment.post.id = :postId
""")
    Page<Comment> findAllByPostId(Integer postId, Pageable pageable);
}
