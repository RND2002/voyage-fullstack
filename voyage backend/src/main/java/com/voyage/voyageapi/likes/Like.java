package com.voyage.voyageapi.likes;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.voyage.voyageapi.common.BaseClass;
import com.voyage.voyageapi.user.User;
import com.voyage.voyageapi.userposts.Post;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "likes")
public class Like extends BaseClass {


    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "user_id")
    private User user;
}
