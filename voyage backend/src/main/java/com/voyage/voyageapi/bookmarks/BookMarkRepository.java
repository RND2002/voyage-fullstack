package com.voyage.voyageapi.bookmarks;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookMarkRepository extends JpaRepository<BookMark,Integer> {

    @Query("""
            SELECT bookmark
            FROM BookMark bookmark
            where bookmark.id=:userId
""")
    Page<BookMark> findAllBookmarkedPostForUser(Integer userId, Pageable pageable);
}
