package com.learnx.learnx_backend.Models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "verification_tokens")
@Data
public class VerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String token;
    @Column(nullable = false)
    private LocalDateTime expiryDateTime;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    // @JsonManagedReference
    private User user;
}
