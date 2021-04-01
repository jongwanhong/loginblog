package wanjongth.loginblog.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import wanjongth.loginblog.dto.CommentRequestDto;
import wanjongth.loginblog.model.Comment;
import wanjongth.loginblog.repository.CommentRepository;
import wanjongth.loginblog.security.UserDetailsImpl;
import wanjongth.loginblog.service.CommentService;
import wanjongth.loginblog.util.CommentSpecs;

import java.util.List;


@RequiredArgsConstructor // final로 선언된 멤버 변수 자동으로 생성
@RestController // JSON으로 데이터 주고받기 선언
public class CommentController {

    private final CommentService commentService;
    private final CommentRepository commentRepository;

    // 목록 조회
    @GetMapping("/api/comments/{post_id}")
    public List<Comment> getComment(@PathVariable Long post_id){
        return commentRepository.findAll(CommentSpecs.withPost_id(post_id));
    }


    // 생성
    @PostMapping("/api/comments")
    public Comment createComment(@RequestBody CommentRequestDto requestDto , @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Comment comment = new Comment(requestDto, userDetails); // -> 사용자 입력, 로그인한 유저의 아이디를 사용하기 위해 매개변수 설정
        return commentRepository.save(comment);
    }


    // update
    @PutMapping("/api/comments/{id}")
    public Long updateComments(@PathVariable Long id, @RequestBody CommentRequestDto requestDto) {
        commentService.update(id, requestDto);
        return id;
    }

    // Delete
    @DeleteMapping("/api/comments/{id}")
    public Long deleteComment(@PathVariable Long id) {
        commentRepository.deleteById(id);
        return id;
    }
}