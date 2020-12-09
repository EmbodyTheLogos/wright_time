package edu.team5.wright_time.model.repository;

import edu.team5.wright_time.model.entity.Aircraft;
import edu.team5.wright_time.model.entity.Certification;
import edu.team5.wright_time.model.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CertificationRepository extends CrudRepository <Certification, Long> {

    List<Certification> findCertificationByAircraft(Aircraft aircraft);
    List<Certification> findCertificationByUser(User user);
}
