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
    private String model;

    public Aircraft(String manufacturer, String model) {
        this.manufacturer = manufacturer;
        this.model = model;
    }

    public Aircraft() {
    }
}
