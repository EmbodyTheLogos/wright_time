package edu.team5.wright_time.controller;

import edu.team5.wright_time.model.entity.Aircraft;
import edu.team5.wright_time.model.repository.AircraftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
    public void addAircraft(@RequestBody @Valid Aircraft aircraft) {
        aircraftRepository.save(aircraft);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOneAircraft(@PathVariable int id)
    {
        return (ResponseEntity<?>) aircraftRepository.findById(id)
                .map(aircraft -> new ResponseEntity(aircraft, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity("Aircraft not found.", HttpStatus.NOT_FOUND));

    }


    @PutMapping("/{id}")
    public void updateAircraft(@PathVariable int id, @RequestBody @Valid Aircraft aircraft) {
        aircraftRepository.findById(id).map(toUpdate -> {
            toUpdate.setManufacturer(aircraft.getManufacturer());
            toUpdate.setName(aircraft.getName());
            toUpdate.setModel(aircraft.getModel());
            toUpdate.setYear(aircraft.getYear());
            toUpdate.setMaintenanceDay(aircraft.getMaintenanceDay());
            toUpdate.setMinimumTrainingDuration(aircraft.getMinimumTrainingDuration());
            return aircraftRepository.save(toUpdate);
        }).orElseGet(() -> {
            aircraft.setAircraftId(id);
            return aircraftRepository.save(aircraft);
        });
    }

    @DeleteMapping("/{id}")
    public void deleteAircraft(@PathVariable int id) {
        aircraftRepository.deleteById(id);
    }

}

