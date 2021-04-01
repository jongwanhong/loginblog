package wanjongth.loginblog.util;

import org.springframework.data.jpa.domain.Specification;
import wanjongth.loginblog.model.Comment;

public class CommentSpecs {

    public static Specification<Comment> withPost_id(Long post_id) {
        return (Specification<Comment>) ((root, query, builder) ->
                builder.equal(root.get("post_id"), post_id)
        );
    }
}