package com.voyage.voyageapi.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Token {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(unique = true)
    private String token;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private LocalDateTime validatedAt;

    @ManyToOne
    @JoinColumn(name = "userId",nullable = false)
    private User user;
}
