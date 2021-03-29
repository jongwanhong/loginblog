package wanjongth.loginblog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wanjongth.loginblog.model.Post;


public interface PostRepository extends JpaRepository<Post, Long>{
}
