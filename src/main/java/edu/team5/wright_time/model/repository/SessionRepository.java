package edu.team5.wright_time.model.repository;

import edu.team5.wright_time.model.entity.Session;
import edu.team5.wright_time.model.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface SessionRepository extends CrudRepository<Session,Integer> {
    //List<Session> findSessionByStateAndDateBetween(Session.State state, Date begin, Date end);

    List<Session> findSessionByInstructor(User instructor);
    List<Session> findSessionByStudent(User student);

    @Query(value = "SELECT * from Session where state = Session.State.PENDING", nativeQuery = true)
    List<Session> findPendingSessions();

    //I could not figure out how to calculate hours flown given startTime and endTime,
    //so I just return the values for each assuming another function can take them in and calculate
    //flight time from them.
    List<Session> findStartTimeAndEndTimeByStudentAndDateBetween(User student, Date begin, Date end);
//    @Query('SELECT * from Session where State = ')
//    int findStudentHoursInWeek(Date begin, Date end);
}
