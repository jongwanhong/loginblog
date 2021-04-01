package wanjongth.loginblog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import wanjongth.loginblog.dto.CommentRequestDto;
import wanjongth.loginblog.model.Comment;
import wanjongth.loginblog.repository.CommentRepository;


import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;

    @Transactional
    public Long update(Long id, CommentRequestDto requestDto) {
        Comment comment = commentRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );
        comment.update(requestDto);
        return comment.getId();
    }

}
