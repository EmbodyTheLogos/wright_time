package edu.team5.wright_time.model.entity;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;
import java.util.Date;

@Entity
@Data
public class Session {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int sessionId;

//    @NotEmpty(message="studentId cannot be empty")
    @Positive(message="studentId must be positive") //TODO: proper foreign key
    private int studentId;

//    @NotEmpty(message="instructorId cannot be empty")
    @Positive(message="instructorId must be positive") //TODO: proper foreign key
    private int instructorId;

//    @NotEmpty(message="aircraftId cannot be empty")
    @Positive(message="aircraftId must be positive") //TODO: proper foreign key
    private int aircraftId;

    @NotEmpty(message="startTime cannot be empty") //TODO: this should be an integer
    @Digits(integer=4,fraction=0,message="Must enter a valid time")
    @Max(value=2359,message="Must enter a valid time")
    private String startTime; //TODO: this should be an integer

    @NotEmpty(message="endTime cannot be empty") //TODO: this should be an integer
    @Digits(integer=4,fraction=0,message="Must enter a valid time")
    @Max(value=2359,message="Must enter a valid time")
    private String endTime;

    //TODO: date format
    private Date date;

    //TODO: restrict to certain states.
    private String state;

    @NotEmpty(message="Comments cannot be empty")
    private String comments;

    @Min(value=1, message="Score must be an integer between 1 and 5")
    @Max(value=5, message="Score must be an integer between 1 and 5")
    @Digits(integer=1, fraction=0, message="Score must be an integer between 1 and 5") //is this needed.
    private int score;

    public Session(int studentId, int instructorId, int aircraftId, String startTime, String endTime, Date date, String state, String comments, int score) {
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
