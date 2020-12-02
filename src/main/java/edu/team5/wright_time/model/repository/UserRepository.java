package edu.team5.wright_time.model.repository;

import edu.team5.wright_time.model.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findUsersByRole(String role);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

}
