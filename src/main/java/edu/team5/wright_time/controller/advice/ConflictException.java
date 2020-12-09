package edu.team5.wright_time.controller.advice;

import edu.team5.wright_time.model.entity.Session;
import lombok.Getter;

public class ConflictException extends Exception {
    @Getter
    private Session conflict;
    public ConflictException(String message, Session conflict) {
        super(message);
        this.conflict = conflict;
    }
}
