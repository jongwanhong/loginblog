package com.wanjongth.hblog.models;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Post extends Timestamped{

    // ID 자동 생성 및 증가
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String honor;

    @Column(nullable = false)
    private String contents;
}
