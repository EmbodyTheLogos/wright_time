package edu.team5.wright_time.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class AircraftNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(AircraftNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String aircraftNotfoundHandler(AircraftNotFoundException aircraftNotFoundException)
    {
        return aircraftNotFoundException.getMessage();
    }

}
