package com.voyage.voyageapi.likes;

import com.voyage.voyageapi.user.User;
import com.voyage.voyageapi.userposts.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like,Integer> {

    @Query("""
            SELECT like
            FROM Like  like
            WHERE like.post.id = :postId
""")
    Page<Like> findAllByPostId(Pageable pageable, Integer postId);

    Like findByUserAndPost(User user, Post post);
}
