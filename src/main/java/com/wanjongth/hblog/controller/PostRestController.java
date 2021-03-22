package com.wanjongth.hblog.controller;

import com.wanjongth.hblog.models.Post;
import com.wanjongth.hblog.models.PostRepository;
import com.wanjongth.hblog.models.PostRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor // final로 선언된 멤버 변수 자동으로 생성
@RestController // JSON으로 데이터 주고받기 선언
public class PostRestController {

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


}
