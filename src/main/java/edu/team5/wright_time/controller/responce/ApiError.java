package edu.team5.wright_time.controller.responce;

import lombok.Data;

@Data
public class ApiError {
    private String message;

    public ApiError(String message) {
        this.message = message;
    }
}
