package com.wanjongth.hblog.models;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor // 기본 생성자 생성
@Getter
@Entity//꼭 ㅜㅜ 넣어주자 - 테이블과 연계됨을 스프링에게 알려줌
public class Post extends Timestamped{ // 생성, 수정 시간을 자동으로 만듦
    // 변수 선언
    // ID 자동 생성 및 증
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String contents;

    // 생성자
    public Post(String title, String author, String contents) {
        this.title = title;
        this.author = author;
        this.contents = contents;
    }

    // 클라이언트에서 작성한 내용 담고다니는 생성자
    public Post(PostRequestDto requestDto) {
        this.title = requestDto.getTitle();
        this.author = requestDto.getAuthor();
        this.contents = requestDto.getContents();
    }

    // 업데이트 생성자
    public void update(PostRequestDto requestDto) {
        this.title = requestDto.getTitle();
        this.author = requestDto.getAuthor();
        this.contents = requestDto.getContents();
    }
}
