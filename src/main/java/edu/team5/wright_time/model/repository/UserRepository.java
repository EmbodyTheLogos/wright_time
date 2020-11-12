package edu.team5.wright_time.model.repository;

import edu.team5.wright_time.model.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findUsersByRole(String role);
}
