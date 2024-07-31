package com.voyage.voyageapi.notification;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Integer> {

    @Query("""
            SELECT notification
            FROM Notification  notification
            WHERE notification.generatedForUser.id = :userId
""")
    Page<Notification> findAllByUserId(Pageable pageable, Integer userId);
}
