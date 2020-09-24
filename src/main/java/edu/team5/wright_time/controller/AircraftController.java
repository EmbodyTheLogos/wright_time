package edu.team5.wright_time.controller;

import edu.team5.wright_time.model.entity.Aircraft;
import edu.team5.wright_time.model.repository.AircraftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/aircraft")
@CrossOrigin(origins = "http://localhost:3030")
public class AircraftController {
    private AircraftRepository aircraftRepository;
    @Autowired
    public AircraftController(AircraftRepository aircraftRepository) {
        this.aircraftRepository = aircraftRepository;
    }

    @GetMapping
    public Iterable<Aircraft> getAircraft(){

        return aircraftRepository.findAll();
    }
}
