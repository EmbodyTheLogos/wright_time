package edu.team5.wright_time.model.repository;

import edu.team5.wright_time.model.entity.Aircraft;
import org.springframework.data.repository.CrudRepository;

public interface AircraftRepository extends CrudRepository<Aircraft,Integer> {
    
}
