package edu.team5.wright_time.controller;

import edu.team5.wright_time.model.entity.Session;
import edu.team5.wright_time.model.repository.AircraftRepository;
import edu.team5.wright_time.model.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/session")
@CrossOrigin(origins = "http://localhost:3000")
public class SessionController {
    private final SessionRepository sessionRepository;

    @Autowired
    public SessionController(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @GetMapping
    public Iterable<Session> getSession(){
        return sessionRepository.findAll();
    }

    @PostMapping
    public Session addSession(@RequestBody @Valid Session session) {
        return sessionRepository.save(session);
    }

    @GetMapping("/{id}")
    public Session getOneSession(@PathVariable int id) throws SessionNotFoundException {
        return sessionRepository.findById(id).orElseThrow(() -> new SessionNotFoundException(id));
    }

    @PutMapping("/{id}")
    public Session updateSessionAircraft(@PathVariable int id, @RequestBody @Valid Session session) {
        return sessionRepository.findById(id).map(toUpdate -> {
            toUpdate.setAircraftId(session.getAircraftId());
            toUpdate.setComments(session.getComments());
            toUpdate.setDate(session.getDate());
            toUpdate.setEndTime(session.getEndTime());
            toUpdate.setInstructorId(session.getInstructorId());
            toUpdate.setScore(session.getScore());
            toUpdate.setStartTime(session.getStartTime());
            toUpdate.setState(session.getState());
            toUpdate.setStudentId(session.getStudentId());
            return sessionRepository.save(toUpdate);
        }).orElseGet(() -> {
            session.setSessionId(id);
            return sessionRepository.save(session);
        });
    }

    @DeleteMapping("/{id}")
    public void deleteSession(@PathVariable int id) {
        sessionRepository.deleteById(id);
    }

}

