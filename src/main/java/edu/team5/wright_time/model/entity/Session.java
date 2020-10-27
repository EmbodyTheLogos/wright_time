package edu.team5.wright_time.model.entity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;

@Entity
@Data
public class Session {
    public enum State {
        PENDING, APPROVED, DECLINED, CANCELED, COMPLETE
    }

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JoinColumn(name="student_id")
    private User student;

    @ManyToOne
    @JoinColumn(name="instructor_id")
    private User instructor;

    @ManyToOne
    @JoinColumn(name="aircraft_id")
    private Aircraft aircraft;

    @Positive(message="Must enter a valid time")
    @Max(value=2359,message="Must enter a valid time")
    private int startTime;

    @Positive(message="Must enter a valid time")
    @Max(value=2359,message="Must enter a valid time")
    private int endTime;

    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @PastOrPresent(message="Must have a valid date")
    private Date dateCreated;

    @Enumerated(EnumType.STRING)
    private State state;

    @NotEmpty(message="Comments cannot be empty")
    private String comments;

    @Min(value=1, message="Score must be an integer between 1 and 5")
    @Max(value=5, message="Score must be an integer between 1 and 5")
    private int score;

    public Session(User student, User instructor, Aircraft aircraft, int startTime, int endTime, Date date, State state, String comments, int score) {
        this.student = student;
        this.instructor = instructor;
        this.aircraft = aircraft;
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
