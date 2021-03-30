package wanjongth.loginblog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wanjongth.loginblog.model.Post;

import java.util.List;


public interface PostRepository extends JpaRepository<Post, Long>{
    List<Post> findAllByOrderByModifiedAtDesc();
}
