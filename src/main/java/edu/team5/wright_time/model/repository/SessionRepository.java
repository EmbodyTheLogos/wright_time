package edu.team5.wright_time.model.repository;

import edu.team5.wright_time.model.entity.Aircraft;
import edu.team5.wright_time.model.entity.Session;
import edu.team5.wright_time.model.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface SessionRepository extends CrudRepository<Session, Long> {
    List<Session> findSessionByInstructor(User instructor);
    List<Session> findSessionByStudent(User student);
    List<Session> findSessionByStudentAndState(User student, Session.State state);
    List<Session> findSessionByInstructorAndState(User instructor, Session.State state);
    List<Session> findSessionsByState(Session.State state);
    List<Session> findSessionByStudentAndDateBetween(User student, LocalDate begin, LocalDate end);
    List<Session> findSessionByInstructorAndDateBetween(User student, LocalDate begin, LocalDate end);
    List<Session> findSessionByAircraft(Aircraft aircraft);
}
