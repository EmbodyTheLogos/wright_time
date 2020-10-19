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
    private int aircraftId;

    @NotEmpty(message = "Manufacturer cannot be empty")
    @Size(min=0,max=255,message="Manufacturer cannot exceed 255 characters")
    private String manufacturer;

    @NotEmpty(message = "Name cannot be empty")
    @Size(min=0,max=255,message="Name cannot exceed 255 characters")
    private String name;

    @NotEmpty(message = "Model cannot be empty")
    @Size(min=0,max=255,message="Model cannot exceed 255 characters")
    private String model;

    @NotNull(message="Must enter a year") //TODO: handled by int
    @Positive(message="Must enter a valid year")
    @Digits(integer = 4, fraction=0, message="Must enter a valid year")
//    @PastOrPresent(message="Must enter a valid year")
    private int year;

    @NotNull(message="Must enter a maintenance day")
    @Min(value=1, message="Must enter an integer between 1 and 28")
    @Max(value=28, message="Must enter an integer between 1 and 28")
    @Digits(integer=2, fraction=0, message="Must enter an integer between 1 and 28")
    private int maintenanceDay;

    @NotNull(message="Must enter a positive integer")
    @Min(value=1, message="Must enter a positive integer") //TODO: this needs a maximum
    @Digits(integer = 10, fraction = 0, message="Must enter a positive integer")
    private int minimumTrainingDuration;

    public Aircraft(String manufacturer, String name, String model, int year, int maintenanceDay, int minimumTrainingDuration) {
        this.manufacturer = manufacturer;
        this.name = name;
        this.model = model;
        this.year = year;
        this.maintenanceDay = maintenanceDay;
        this.minimumTrainingDuration = minimumTrainingDuration;
    }

    public Aircraft() {
    }
}
