package edu.team5.wright_time.controller;

import edu.team5.wright_time.model.entity.Aircraft;
import edu.team5.wright_time.model.repository.AircraftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/aircraft")
@CrossOrigin(origins = "http://localhost:3000")
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

    @PostMapping
    public void addAircraft(Aircraft aircraft)
    {
        aircraftRepository.save(aircraft);
    }

    @GetMapping("/{id}")
    public Aircraft getOneAircraft(Integer id)
    {
       return aircraftRepository.findById(id).get();
    }


    @PutMapping("/{id}")
    public void updateAircraft(Aircraft aircraft)
    {
        aircraftRepository.save(aircraft);
    }


    @DeleteMapping("/{id}")
    public void deleteAircraft(Integer id)
    {
        aircraftRepository.delete(getOneAircraft(id));
    }

}
