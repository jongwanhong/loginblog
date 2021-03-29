package wanjongth.loginblog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import wanjongth.loginblog.dto.PostRequestDto;
import wanjongth.loginblog.model.Post;
import wanjongth.loginblog.repository.PostRepository;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;

    @Transactional
    public Long update(Long id, PostRequestDto requestDto) {
        Post post = postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );
        post.update(requestDto);
        return post.getId();
    }

}
