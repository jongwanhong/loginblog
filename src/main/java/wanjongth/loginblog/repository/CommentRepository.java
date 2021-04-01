package wanjongth.loginblog.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import wanjongth.loginblog.model.Comment;

import java.time.LocalDateTime;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByModifiedAtBetweenOrderByModifiedAtDesc(LocalDateTime start, LocalDateTime end);
}
