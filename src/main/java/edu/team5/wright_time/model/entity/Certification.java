package edu.team5.wright_time.model.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.PastOrPresent;
import java.util.Date;

@Entity
@Data
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name="userId")
    private User user;

    @ManyToOne
    @JoinColumn(name="aircraftId")
    private Aircraft aircraft;

    @PastOrPresent(message="Must enter a valid date") //TODO: empty does not work on ints
    private Date dateObtained;

    public Certification(User user, Aircraft aircraft, Date dateObtained) {
        this.user = user;
        this.aircraft = aircraft;
        this.dateObtained = dateObtained;
    }

    public Certification(){

    }
}

//@Embeddable
//
//class CertificationId implements Serializable {
//
//
//    public int getUserId() {
//        return userId;
//    }
//
//    public void setUserId(int userId) {
//        this.userId = userId;
//    }
//
//    public int getAircraftId() {
//        return aircraftId;
//    }
//
//    public void setAircraftId(int aircraftId) {
//        this.aircraftId = aircraftId;
//    }
//}
