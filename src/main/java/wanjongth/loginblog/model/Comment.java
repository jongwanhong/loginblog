package wanjongth.loginblog.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import wanjongth.loginblog.dto.CommentRequestDto;
import wanjongth.loginblog.security.UserDetailsImpl;

import javax.persistence.*;

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

    // 클라이언트에서 작성한 내용 담고다니는 생성자
    public Comment(CommentRequestDto requestDto , UserDetailsImpl userDetails) {
        this.contents = requestDto.getContents();
        this.author = userDetails.getUsername(); //UserDetailsImpl에 현재 로그인한 유저의 username을 받아온다. -> 컨트롤러로 넘김
//        this.author = requestDto.getAuthor();//사용자가 입력한 값을 가져온다
    }

    // 업데이트 생성자
    public void update(CommentRequestDto requestDto) {
        this.author = requestDto.getAuthor();
        this.contents = requestDto.getContents();
    }
}