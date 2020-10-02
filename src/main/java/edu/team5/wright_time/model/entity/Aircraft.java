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
    private int maintenance_day;
    private int minimum_training_duration;

    public Aircraft(String manufacturer, String name, String model, int year, int maintenance_day, int minimum_training_duration) {
        this.manufacturer = manufacturer;
        this.name = name;
        this.model = model;
        this.year = year;
        this.maintenance_day = maintenance_day;
        this.minimum_training_duration = minimum_training_duration;
    }

    public Aircraft() {
    }
}
