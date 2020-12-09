package edu.team5.wright_time.controller.advice;

import edu.team5.wright_time.controller.responce.ApiConflictError;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ConflictAdvice {
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(ConflictException.class)
    @ResponseBody
    public ApiConflictError conflict(ConflictException e) {
        return new ApiConflictError(e.getMessage(), e.getConflict());
    }
}
