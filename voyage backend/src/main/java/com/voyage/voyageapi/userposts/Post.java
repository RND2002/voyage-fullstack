package com.voyage.voyageapi.userposts;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.voyage.voyageapi.comments.Comment;
import com.voyage.voyageapi.common.BaseClass;
import com.voyage.voyageapi.likes.Like;
import com.voyage.voyageapi.notification.Notification;
import com.voyage.voyageapi.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Post extends BaseClass {

    private String title;
    private String description;
    private String postCover;
    @ElementCollection
    private List<String> tags;
    private Boolean isVisible;
    private Boolean isDeleted=false;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;




    @OneToMany(mappedBy = "post")
    private List<Comment> comments;
    @JsonBackReference
    @OneToMany(mappedBy = "post")
    private Set<Like> likes;

    @OneToOne
    private Notification notification;


}
