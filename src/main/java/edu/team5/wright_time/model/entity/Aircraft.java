package edu.team5.wright_time.model.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;

@Entity
@Data
public class Aircraft {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    @NotEmpty(message = "Manufacturer cannot be empty")
    @Size(min=0, max=255,message="Manufacturer cannot exceed 255 characters")
    private String manufacturer;

    @NotEmpty(message = "Name cannot be empty")
    @Size(min=0,max=255,message="Name cannot exceed 255 characters")
    private String name;

    @NotEmpty(message = "Model cannot be empty")
    @Size(min=0,max=255,message="Model cannot exceed 255 characters")
    private String model;

    @Positive(message="Must enter a valid year")    //TODO: Check year in backend
    private int year;

    @Min(value=1, message="Maintenance day must be an integer between 1 and 28")
    @Max(value=28, message="Maintenance day must be an integer between 1 and 28")
    private int maintenanceDay;

    @Min(value=1, message="Training duration must be an integer between 1 and 24")
    @Max(value=6, message="Training duration must be an integer between 1 and 24")
    private int trainingDuration;

    public Aircraft(String manufacturer, String name, String model, int year, int maintenanceDay, int trainingDuration) {
        this.manufacturer = manufacturer;
        this.name = name;
        this.model = model;
        this.year = year;
        this.maintenanceDay = maintenanceDay;
        this.trainingDuration = trainingDuration;
    }

    public Aircraft() {
    }
}
