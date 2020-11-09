package edu.team5.wright_time.model.repository;

import edu.team5.wright_time.model.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

}
