package edu.team5.wright_time.model.repository;

import edu.team5.wright_time.model.entity.Aircraft;
import edu.team5.wright_time.model.entity.Session;
import edu.team5.wright_time.model.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface SessionRepository extends CrudRepository<Session, Long> {
    //List<Session> findSessionByStateAndDateBetween(Session.State state, Date begin, Date end);

    List<Session> findSessionByInstructor(User instructor);
    List<Session> findSessionByStudent(User student);

    // TODO: this does not work. It does not seem to find Session.State.Pending. But I can't seem to fix it.
//    @Query(value = "SELECT * from Session where state = Session.State.PENDING", nativeQuery = true)
//    List<Session> findPendingSessions();

    //TODO: so I wrote a new one. Also this is a reminder to me to show you how to test these methods and add defaults.
    List<Session> findSessionsByState(Session.State state);

    //I could not figure out how to calculate hours flown given startTime and endTime,
    //so I just return the values for each assuming another function can take them in and calculate
    //flight time from them.
    List<Session> findSessionByStudentAndDateBetween(User student, LocalDate begin, LocalDate end);
//    @Query('SELECT * from Session where State = ')
//    int findStudentHoursInWeek(Date begin, Date end);

    List<Session> findSessionByAircraft(Aircraft aircraft);

}
