package wanjongth.loginblog.dto;

import lombok.Getter;

@Getter
public class CommentRequestDto {
    private Long id;
    private String author;
    private String contents;
    private Long post_id;
}