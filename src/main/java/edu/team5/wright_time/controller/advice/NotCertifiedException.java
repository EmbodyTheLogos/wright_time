package edu.team5.wright_time.controller.advice;

import edu.team5.wright_time.model.entity.Aircraft;
import edu.team5.wright_time.model.entity.User;
import lombok.Getter;
import lombok.Setter;

public class NotCertifiedException extends Exception {
    @Getter
    @Setter
    private User user;

    @Getter
    @Setter
    private Aircraft aircraft;

    public NotCertifiedException(String message, User user, Aircraft aircraft) {
        super(message);
        this.user = user;
        this.aircraft = aircraft;
    }
}
