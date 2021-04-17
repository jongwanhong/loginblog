package com.wanjongth.hblog.controller;

import com.wanjongth.hblog.models.Post;
import com.wanjongth.hblog.models.PostRepository;
import com.wanjongth.hblog.models.PostRequestDto;
import com.wanjongth.hblog.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor // final로 선언된 멤버 변수 자동으로 생성
@RestController // JSON으로 데이터 주고받기 선언
public class PostRestController {

    private final PostService postService;
    private final PostRepository postRepository;

    // 생성
    @PostMapping("/api/posts")
    public Post createPost(@RequestBody PostRequestDto requestDto) {
        Post post = new Post(requestDto);
        postRepository.save(post);
        return post;
    }

    // 목록 조회
    @GetMapping("/api/posts")
    public List<Post> getPosts() {

        return postRepository.findAll();
    }

    // update
    @PutMapping("/api/posts/{id}")
    public Long updatePost(@PathVariable Long id, @RequestBody PostRequestDto requestDto) {
        postService.update(id, requestDto);
        return id;
    }

    // Delete
    @DeleteMapping("/api/posts/{id}")
    public Long deletePost(@PathVariable Long id) {
        postRepository.deleteById(id);
        return id;
    }
}
