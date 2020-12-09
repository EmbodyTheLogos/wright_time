package edu.team5.wright_time.controller;

import edu.team5.wright_time.model.entity.Session;
import edu.team5.wright_time.model.repository.SessionRepository;
import edu.team5.wright_time.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;


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

    @GetMapping("/user/{id}")
    @Secured({"ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN"})
    public Iterable<Session> getSessionByUser(@PathVariable long id) throws NoSuchElementException {
        final var user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No user with id: " + id));
        if(user.getRole().equals("ROLE_STUDENT")) {
            return sessionRepository.findSessionByStudent(user);
        } else if (user.getRole().equals("ROLE_INSTRUCTOR")) {
            return sessionRepository.findSessionByInstructor(user);
        } else {
            throw new NoSuchElementException("Internal Error: bad role. ");
        }
    }

    @GetMapping("/positive/user/{id}")
    @Secured({"ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN"})
    public Iterable<Session> getPositiveSessionByUser(@PathVariable long id) throws NoSuchElementException {
        final var user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No user with id: " + id));
        if(user.getRole().equals("ROLE_STUDENT")) {
            return sessionRepository.findSessionByStudent(user)
                    .stream().filter(session -> session.getState() != Session.State.DECLINED && session.getState() != Session.State.CANCELLED).collect(Collectors.toList());
        } else if (user.getRole().equals("ROLE_INSTRUCTOR")) {
            return sessionRepository.findSessionByInstructor(user)
                    .stream().filter(session -> session.getState() != Session.State.DECLINED && session.getState() != Session.State.CANCELLED).collect(Collectors.toList());
        } else {
            throw new NoSuchElementException("Internal Error: bad role. ");
        }
    }

    @GetMapping("user/pending/{id}")
    @Secured({"ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN"})
    public Iterable<Session> getPendingSessionsByUser(@PathVariable long id) throws NoSuchElementException {
        final var user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No user with id: " + id));
        if(user.getRole().equals("ROLE_STUDENT")) {
            return sessionRepository.findSessionByStudentAndState(user, Session.State.PENDING);
        } else if (user.getRole().equals("ROLE_INSTRUCTOR")) {
            return sessionRepository.findSessionByInstructorAndState(user, Session.State.PENDING);
        } else {
            throw new NoSuchElementException("Internal Error: bad role. ");
        }
    }

    @GetMapping("user/approved/{id}")
    @Secured({"ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN"})
    public Iterable<Session> getApprovedSessionsByUser(@PathVariable long id) throws NoSuchElementException {
        final var user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No user with id: " + id));
        if(user.getRole().equals("ROLE_STUDENT")) {
            return sessionRepository.findSessionByStudentAndState(user, Session.State.APPROVED);
        } else if (user.getRole().equals("ROLE_INSTRUCTOR")) {
            return sessionRepository.findSessionByInstructorAndState(user, Session.State.APPROVED);
        } else {
            throw new NoSuchElementException("Internal Error: bad role. ");
        }
    }


    @GetMapping("/{id}")
    @Secured({"ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN"})
    public Session getOneSession(@PathVariable long id) throws NoSuchElementException {
        return sessionRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No session with id: " + id));
    }

    @GetMapping("/upcoming/{id}")
    @Secured({"ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN"})
    public List<Session> getUpcomingSessions(@PathVariable long id) throws NoSuchElementException {
        final var locale = Locale.US;
        final var begin = LocalDate.now();
        final var end = begin.plusWeeks(2);
        final var user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No user with id: " + id));
        if(user.getRole().equals("ROLE_STUDENT")) {
            return sessionRepository.findSessionByStudentAndDateBetween(user, begin, end)
                    .stream().filter(session -> session.getState() != Session.State.DECLINED && session.getState() != Session.State.CANCELLED).collect(Collectors.toList());
        } else if (user.getRole().equals("ROLE_INSTRUCTOR")) {
            return sessionRepository.findSessionByInstructorAndDateBetween(user, begin, end)
                    .stream().filter(session -> session.getState() != Session.State.DECLINED && session.getState() != Session.State.CANCELLED).collect(Collectors.toList());
        } else {
            throw new NoSuchElementException("Internal Error: bad role. ");
        }
    }

    @GetMapping("/recent/{id}")
    @Secured({"ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN"})
    public List<Session> getRecentSessions(@PathVariable long id) throws NoSuchElementException {
        final var student = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No student with id: " + id));
        final var locale = Locale.US;
        final var end = LocalDate.now().minusDays(1);
        final var begin = end.minusWeeks(2);
        final var user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No user with id: " + id));
        if(user.getRole().equals("ROLE_STUDENT")) {
            return sessionRepository.findSessionByStudentAndDateBetween(user, begin, end)
                    .stream().filter(session -> session.getState() != Session.State.DECLINED && session.getState() != Session.State.CANCELLED).collect(Collectors.toList());
        } else if (user.getRole().equals("ROLE_INSTRUCTOR")) {
            return sessionRepository.findSessionByInstructorAndDateBetween(user, begin, end)
                    .stream().filter(session -> session.getState() != Session.State.DECLINED && session.getState() != Session.State.CANCELLED).collect(Collectors.toList());
        } else {
            throw new NoSuchElementException("Internal Error: bad role. ");
        }
    }

    public void checkForConflicts(Session session) throws NoSuchElementException {
        List<Session> allSessions = (List<Session>) sessionRepository.findAll();
        ArrayList<Session> conflictSessions = new ArrayList<>();
        int sessionEndTime = session.getStartTime() + session.getAircraft().getTrainingDuration();

        //Collect all of the sessions that conflict in time with 'session'
        for (Session eachSession : allSessions) {
            //End time = start time + aircraft.training_duration
            int eachSessionEndTime = eachSession.getStartTime() + eachSession.getAircraft().getTrainingDuration();
            if (eachSession.getDate().equals(session.getDate())
                    && ((eachSession.getStartTime() >= session.getStartTime() && eachSession.getStartTime() <= sessionEndTime)
                    || (eachSessionEndTime >= session.getStartTime() && eachSessionEndTime <= sessionEndTime))) {
                conflictSessions.add(eachSession);
            }
        }

        //check if student, instructor, and aircraft in 'session' are in conflict with other sessions.
        for (Session eachSession : conflictSessions) {
            if ((eachSession.getStudent().getId() == session.getStudent().getId())) {
                throw new NoSuchElementException("Student is in conflict with other sessions");
            }
            else if ((eachSession.getInstructor().getId() == session.getInstructor().getId())) {
                throw new NoSuchElementException("Instructor is in conflict with other sessions");
            }
            else if ((eachSession.getAircraft().equals(session.getAircraft()))) {
                throw new NoSuchElementException("Aircraft is in conflict with other sessions");
            }
        }
    }

    @PostMapping
    @Secured({"ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN"})
    public Session addSession(@RequestBody @Valid Session session) throws NoSuchElementException {
        checkForConflicts(session);
        return sessionRepository.save(session);
    }

    @PutMapping("/{id}")
    @Secured({"ROLE_ADMIN", "ROLE_INSTRUCTOR"})
    public Session updateSessionAircraft(@PathVariable long id, @RequestBody @Valid Session session) throws NoSuchElementException {
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

    @PutMapping("/{id}/cancel")
    @Secured({"ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN"})
    public Session cancel(@PathVariable long id) throws NoSuchElementException {
        return sessionRepository.findById(id).map(toUpdate -> {
            toUpdate.setState(Session.State.CANCELLED);
            return sessionRepository.save(toUpdate);
        }).orElseThrow(() -> new NoSuchElementException("No session with id: " + id));
    }

    @DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public void deleteSession(@PathVariable long id) {
        sessionRepository.deleteById(id);
    }

}

