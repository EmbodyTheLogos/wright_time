package edu.team5.wright_time.controller;

import edu.team5.wright_time.model.entity.Aircraft;
import edu.team5.wright_time.model.repository.AircraftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/aircraft")
@CrossOrigin(origins = "http://localhost:3000")
public class AircraftController {
    private final AircraftRepository aircraftRepository;

    @Autowired
    public AircraftController(AircraftRepository aircraftRepository) {
        this.aircraftRepository = aircraftRepository;
    }

    @GetMapping
    public Iterable<Aircraft> getAircraft(){
        return aircraftRepository.findAll();
    }

    @PostMapping
    public void addAircraft(@RequestBody Aircraft aircraft) {
        aircraftRepository.save(aircraft);
    }

    @GetMapping("/{id}")
    public Aircraft getOneAircraft(@PathVariable int id)
    {
       return aircraftRepository.findById(id).get();
    }

    @PutMapping("/{id}")
    public void updateAircraft(@PathVariable int id, @RequestBody Aircraft aircraft) {
        aircraftRepository.findById(id).ifPresentOrElse(toUpdate -> {
            toUpdate.setManufacturer(aircraft.getManufacturer());
            toUpdate.setName(aircraft.getName());
            toUpdate.setModel(aircraft.getModel());
            toUpdate.setYear(aircraft.getYear());
            toUpdate.setMaintenanceDay(aircraft.getMaintenanceDay());
            toUpdate.setMinimumTrainingDuration(aircraft.getMinimumTrainingDuration());
        }, () -> {
            aircraft.setAircraftId(id);
            aircraftRepository.save(aircraft);
        });
    }

    @DeleteMapping("/{id}")
    public void deleteAircraft(@PathVariable int id) {
        aircraftRepository.deleteById(id);
    }

}

