package edu.team5.wright_time.model.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class Aircraft {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int aircraftId;
    private String manufacturer;
    private String name;
    private String model;
    private int year;
    private int maintenanceDay;
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
