package com.example.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.project.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    Optional<User> findByUsernameOrEmail(String username, String email);
    Optional<User> findByResetToken(String resetToken);
    
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
   // Object findByUsernameOrEmail(String usernameOrEmail, String usernameOrEmail2);
}




