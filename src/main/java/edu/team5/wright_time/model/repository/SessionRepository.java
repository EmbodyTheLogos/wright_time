package edu.team5.wright_time.model.repository;

import edu.team5.wright_time.model.entity.Session;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface SessionRepository extends CrudRepository<Session,Integer> {
    List<Session> findSessionByStateAndDateBetween(Session.State state, Date begin, Date end);

//    @Query('SELECT * from Session where State = ')
//    int findStudentHoursInWeek(Date begin, Date end);
}
