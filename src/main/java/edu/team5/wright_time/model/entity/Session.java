package edu.team5.wright_time.model.entity;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;

@Entity
@Data
public class Session {
    public enum State {
        PENDING, APPROVED, DECLINED, CANCELED, COMPLETE;
    }

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int sessionId;

    @Positive(message="studentId must be positive") //TODO: proper foreign key
    private int studentId;

    @Positive(message="instructorId must be positive") //TODO: proper foreign key
    private int instructorId;

    @Positive(message="aircraftId must be positive") //TODO: proper foreign key
    private int aircraftId;

    @Digits(integer=4,fraction=0,message="Must enter a valid time")
    @Max(value=2359,message="Must enter a valid time")
    private int startTime; //TODO: this should be an integer

    @Digits(integer=4,fraction=0,message="Must enter a valid time")
    @Max(value=2359,message="Must enter a valid time")
    private int endTime;

    //TODO: date format
    private Date date;

    @Enumerated(EnumType.STRING)
    private State state;

    @NotEmpty(message="Comments cannot be empty")
    private String comments;

    @Min(value=1, message="Score must be an integer between 1 and 5")
    @Max(value=5, message="Score must be an integer between 1 and 5")
    @Digits(integer=1, fraction=0, message="Score must be an integer between 1 and 5") //is this needed.
    private int score;

    public Session(int studentId, int instructorId, int aircraftId, int startTime, int endTime, Date date, State state, String comments, int score) {
        this.studentId = studentId;
        this.instructorId = instructorId;
        this.aircraftId = aircraftId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.date = date;
        this.state = state;
        this.comments = comments;
        this.score = score;
    }

    public Session() {

    }
}
