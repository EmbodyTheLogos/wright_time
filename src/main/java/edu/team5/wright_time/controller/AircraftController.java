package edu.team5.wright_time.controller;

import edu.team5.wright_time.model.entity.Aircraft;
import edu.team5.wright_time.model.repository.AircraftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.NoSuchElementException;

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
    public Aircraft addAircraft(@RequestBody @Valid Aircraft aircraft) {
        return aircraftRepository.save(aircraft);
    }

    @GetMapping("/{id}")
    public Aircraft getOneAircraft(@PathVariable long id) throws NoSuchElementException {
        return aircraftRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No aircraft with id: " + id));
    }

    @PutMapping("/{id}")
    public Aircraft updateAircraft(@PathVariable long id, @RequestBody @Valid Aircraft aircraft) {
        return aircraftRepository.findById(id).map(toUpdate -> {
            toUpdate.setManufacturer(aircraft.getManufacturer());
            toUpdate.setName(aircraft.getName());
            toUpdate.setModel(aircraft.getModel());
            toUpdate.setYear(aircraft.getYear());
            toUpdate.setMaintenanceDay(aircraft.getMaintenanceDay());
            toUpdate.setTrainingDuration(aircraft.getTrainingDuration());
            return aircraftRepository.save(toUpdate);
        }).orElseThrow(() -> new NoSuchElementException("No aircraft with id: " + id));
    }

    @DeleteMapping("/{id}")
    public void deleteAircraft(@PathVariable long id) {
        aircraftRepository.deleteById(id);
    }

}

