package edu.team5.wright_time.controller.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompleteSessionRequest {
    @NotEmpty(message = "Comments can't be empty")
    private String comments;
    @Range(min=1, max=5, message="Score must be between 1 and 5. ")
    private int score;
}
