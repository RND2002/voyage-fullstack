package com.voyage.voyageapi.bookmarks;

import com.voyage.voyageapi.common.BaseClass;
import com.voyage.voyageapi.user.User;
import com.voyage.voyageapi.userposts.Post;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BookMark  {
    @Id
    @GeneratedValue
    private Integer id;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @Column(name = "post_id")
    private Set<Integer> postIds = new HashSet<>();

    private LocalDateTime createdDate;

}
