package wanjongth.loginblog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wanjongth.loginblog.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}