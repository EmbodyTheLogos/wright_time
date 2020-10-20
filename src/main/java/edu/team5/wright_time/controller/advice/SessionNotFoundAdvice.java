package edu.team5.wright_time.controller.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class SessionNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(SessionNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String userNotfoundHandler(SessionNotFoundException sessionNotFoundException)
    {
        return sessionNotFoundException.getMessage();
    }

}
