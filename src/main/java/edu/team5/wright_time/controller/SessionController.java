package edu.team5.wright_time.controller;

import edu.team5.wright_time.model.entity.Session;
import edu.team5.wright_time.model.repository.SessionRepository;
import edu.team5.wright_time.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public Iterable<Session> getSession(){
        return sessionRepository.findAll();
    }

    @GetMapping("/pending")
    public Iterable<Session> getPendingSessions() {
        return sessionRepository.findPendingSessions();
    }

    @GetMapping("/instructor/{id}")
    public Iterable<Session> getSessionByInstructor(@PathVariable long id) throws NoSuchElementException {
        final var instructor = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No instructor with id: " + id));
        return sessionRepository.findSessionByInstructor(instructor);
    }

    @GetMapping("/student/{id}")
    public Iterable<Session> getSessionByStudent(@PathVariable long id) throws NoSuchElementException {
        final var student = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No student with id: " + id));
        return sessionRepository.findSessionByStudent(student);
    }

    @GetMapping("/{id}")
    public Session getOneSession(@PathVariable long id) throws NoSuchElementException {
        return sessionRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No session with id: " + id));
    }

    @PostMapping
    public Session addSession(@RequestBody @Valid Session session) {
        return sessionRepository.save(session);
    }

    @PutMapping("/{id}")
    public Session updateSessionAircraft(@PathVariable long id, @RequestBody @Valid Session session) {
        return sessionRepository.findById(id).map(toUpdate -> {
            toUpdate.setAircraft(session.getAircraft());
            toUpdate.setStudent(session.getStudent());
            toUpdate.setInstructor(session.getInstructor());
            toUpdate.setComments(session.getComments());
            toUpdate.setDate(session.getDate());
            toUpdate.setEndTime(session.getEndTime());
            toUpdate.setScore(session.getScore());
            toUpdate.setStartTime(session.getStartTime());
            toUpdate.setState(session.getState());
            return sessionRepository.save(toUpdate);
        }).orElseGet(() -> {
            session.setId(id);
            return sessionRepository.save(session);
        });
    }

    @DeleteMapping("/{id}")
    public void deleteSession(@PathVariable long id) {
        sessionRepository.deleteById(id);
    }

}

