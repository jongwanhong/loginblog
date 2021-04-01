package wanjongth.loginblog.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wanjongth.loginblog.dto.CommentRequestDto;
import wanjongth.loginblog.security.UserDetailsImpl;

import javax.persistence.*;

@Setter
@NoArgsConstructor // 기본 생성자 생성
@Getter
@Entity
public class Comment extends Timestamped{ // 생성, 수정 시간을 자동으로 만듦
    // 변수 선언
    // ID 자동 생성 및 증
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String contents;

//    @ManyToOne
//    @JoinColumn(nullable = false)
//    private Post post_id;
    @Column(nullable = false)
    private Long post_id;

    public Comment(CommentRequestDto requestDto , UserDetailsImpl userDetails) {
        this.contents = requestDto.getContents();
        this.author = userDetails.getUsername(); //UserDetailsImpl에 현재 로그인한 유저의 username을 받아온다. -> 컨트롤러로 넘김
//        this.author = requestDto.getAuthor();//사용자가 입력한 값을 가져온다
        this.post_id = requestDto.getPost_id();
    }

    // 업데이트 생성자
    public void update(CommentRequestDto requestDto) {
        this.author = requestDto.getAuthor();
        this.contents = requestDto.getContents();
        this.post_id = requestDto.getPost_id();
    }
}