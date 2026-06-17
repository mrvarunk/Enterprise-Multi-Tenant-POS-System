package com.pos.saas.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pos.saas.domain.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    @Email(message = "Email should be valid")
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;

    private UserRole role;
    @ManyToOne
    @JsonIgnore // Prevents infinite recursion when fetching users
    private Store store;
    @ManyToOne
    @JsonIgnore
    private Branch branch;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime lastLogin;
}
