package edu.team5.wright_time.model.entity;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.PastOrPresent;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
public class Certifications {
    @EmbeddedId
    private CertificationsId certId;

    @PastOrPresent(message="Must enter a valid date")
    private Date dateObtained;

    public Certifications(CertificationsId certId, @PastOrPresent(message = "Must enter a valid date") Date dateObtained) {
        this.certId = certId;
        this.dateObtained = dateObtained;
    }

    public Certifications(@PastOrPresent(message = "Must enter a valid date") Date dateObtained) {
        this.dateObtained = dateObtained;
    }

    public Certifications(){

    }
}

@Embeddable
class CertificationsId implements Serializable {
    @NotEmpty(message="userId cannot be empty")
    int userId;

    @NotEmpty(message="aircraftId cannot be empty")
    int aircraftId;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getAircraftId() {
        return aircraftId;
    }

    public void setAircraftId(int aircraftId) {
        this.aircraftId = aircraftId;
    }
}
