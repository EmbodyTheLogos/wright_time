package edu.team5.wright_time.model.repository;

import edu.team5.wright_time.model.entity.Certification;
import org.springframework.data.repository.CrudRepository;
import edu.team5.wright_time.model.entity.Aircraft;

import java.util.List;

public interface CertificationRepository extends CrudRepository <Certification, Long> {

    List<Certification> findCertificationByAircraft(Aircraft aircraft);
}
