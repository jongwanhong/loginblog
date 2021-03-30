package wanjongth.loginblog.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignupRequestDto {
    private String username;
    private String password;
//    priavte String pass_check;
    private String email;
}