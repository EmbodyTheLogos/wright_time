package edu.team5.wright_time.controller;

import edu.team5.wright_time.model.entity.Session;
import edu.team5.wright_time.model.repository.SessionRepository;
import edu.team5.wright_time.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;


@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "http://localhost:3000")
public class SessionController {
    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;

    @Autowired
    public SessionController(UserRepository userRepository, SessionRepository sessionRepository) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
    }

    @GetMapping
    @Secured("ROLE_ADMIN")
    public Iterable<Session> getSession() {
        return sessionRepository.findAll();
    }

    @GetMapping("/pending")
    @Secured("ROLE_ADMIN")
    public Iterable<Session> getPendingSessions() {
        return sessionRepository.findSessionsByState(Session.State.PENDING);
    }

    @GetMapping("/instructor/{id}")
    @Secured({"ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN"})
    public Iterable<Session> getSessionByInstructor(@PathVariable long id) throws NoSuchElementException {
        final var instructor = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No instructor with id: " + id));
        return sessionRepository.findSessionByInstructor(instructor);
    }

    @GetMapping("/student/{id}")
    @Secured({"ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN"})
    public Iterable<Session> getSessionByStudent(@PathVariable long id) throws NoSuchElementException {
        final var student = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No student with id: " + id));
        return sessionRepository.findSessionByStudent(student);
    }

    @GetMapping("/{id}")
    @Secured({"ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN"})
    public Session getOneSession(@PathVariable long id) throws NoSuchElementException {
        return sessionRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No session with id: " + id));
    }

    public void checkForConflicts(Session session) throws NoSuchElementException {
        List<Session> allSessions = (List<Session>) sessionRepository.findAll();
        ArrayList<Session> conflictSessions = new ArrayList<>();

        //Collect all of the sessions that conflict in time with 'session'
        for (Session eachSession : allSessions) {
            //End time = start time + aircraft.training_duration
            int sessionEndTime = session.getStartTime() - session.getAircraft().getTrainingDuration();
            int eachSessionEndTime = eachSession.getStartTime() - eachSession.getAircraft().getTrainingDuration();
            if ((eachSession.getStartTime() >= session.getStartTime() && eachSession.getStartTime() <= sessionEndTime)
                    || (eachSessionEndTime >= session.getStartTime() && eachSessionEndTime <= sessionEndTime)) {
                conflictSessions.add(eachSession);
            }
        }

        //check if student, instructor, and aircraft in 'session' are in conflict with other sessions.
        for (Session eachSession : conflictSessions) {
            if ((eachSession.getStudent().equals(session.getStudent()))) {
                throw new NoSuchElementException("Student is in conflict with other sessions");
            }
            if ((eachSession.getInstructor().equals(session.getInstructor()))) {
                throw new NoSuchElementException("Instructor is in conflict with other sessions");
            }
            if ((eachSession.getAircraft().equals(session.getAircraft()))) {
                throw new NoSuchElementException("Aircraft is in conflict with other sessions");
            }
        }
    }

    @PostMapping
    @Secured({"ROLE_ADMIN", "ROLE_STUDENT"})
    public Session addSession(@RequestBody @Valid Session session) throws Exception {
        checkForConflicts(session);
        return sessionRepository.save(session);
    }

    @PutMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public Session updateSession(@PathVariable long id, @RequestBody @Valid Session session) throws Exception {
        checkForConflicts(session);
        return sessionRepository.findById(id).map(toUpdate -> {
            toUpdate.setAircraft(session.getAircraft());
            toUpdate.setStudent(session.getStudent());
            toUpdate.setInstructor(session.getInstructor());
            toUpdate.setComments(session.getComments());
            toUpdate.setDate(session.getDate());
            toUpdate.setScore(session.getScore());
            toUpdate.setStartTime(session.getStartTime());
            toUpdate.setState(session.getState());
            return sessionRepository.save(toUpdate);
        }).orElseThrow(() -> new NoSuchElementException("No session with id: " + id));
    }

    @PutMapping("/{id}/approve")
    @Secured("ROLE_ADMIN")
    public Session approve(@PathVariable long id) throws NoSuchElementException {
        return sessionRepository.findById(id).map(toUpdate -> {
            toUpdate.setState(Session.State.APPROVED);
            return sessionRepository.save(toUpdate);
        }).orElseThrow(() -> new NoSuchElementException("No session with id: " + id));
    }

    @PutMapping("/{id}/decline")
    @Secured("ROLE_ADMIN")
    public Session decline(@PathVariable long id) throws NoSuchElementException {
        return sessionRepository.findById(id).map(toUpdate -> {
            toUpdate.setState(Session.State.DECLINED);
            return sessionRepository.save(toUpdate);
        }).orElseThrow(() -> new NoSuchElementException("No session with id: " + id));
    }

    @DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public void deleteSession(@PathVariable long id) {
        sessionRepository.deleteById(id);
    }

}

