package com.wanjongth.hblog.models;

import lombok.Getter;

@Getter
public class PostRequestDto {
    private String title;
    private String author;
    private String contents;
}
