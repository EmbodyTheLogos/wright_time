package edu.team5.wright_time.controller.advice;

import edu.team5.wright_time.controller.responce.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class NotCertifiedAdvice {
    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    @ExceptionHandler(NotCertifiedException.class)
    @ResponseBody
    public ApiError notCertified(NotCertifiedException e) {
        return new ApiError(e.getMessage());
    }
}
