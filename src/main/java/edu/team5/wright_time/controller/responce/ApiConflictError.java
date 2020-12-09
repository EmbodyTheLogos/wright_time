package edu.team5.wright_time.controller.responce;

import edu.team5.wright_time.model.entity.Session;
import lombok.Data;

@Data
public class ApiConflictError {
    private String message;
    private Session conflict;

    public ApiConflictError(String message, Session conflict) {
        this.message = message;
        this.conflict = conflict;
    }
}
