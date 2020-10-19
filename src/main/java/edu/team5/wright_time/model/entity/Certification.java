package edu.team5.wright_time.model.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.PastOrPresent;
import java.util.Date;

@Entity
@Data
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

//    @NotEmpty(message="userId cannot be empty")
    public int userId;

//    @NotEmpty(message="aircraftId cannot be empty")
    public int aircraftId;

//    @PastOrPresent(message="Must enter a valid date")
    private Date dateObtained;

    public Certification(int userId, int aircraftId, Date dateObtained) {
        this.userId = userId;
        this.aircraftId = aircraftId;
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
