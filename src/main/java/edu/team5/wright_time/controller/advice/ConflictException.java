package edu.team5.wright_time.controller.advice;

public class ConflictException extends Exception {
    String message;
    public ConflictException(String message)
    {
        this.message = message;
    }
}
