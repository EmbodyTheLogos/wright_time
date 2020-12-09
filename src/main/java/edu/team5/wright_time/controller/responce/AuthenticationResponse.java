package edu.team5.wright_time.controller.responce;

import lombok.Data;

@Data
public class AuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";

    public AuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}
