package edu.team5.wright_time.controller;

import edu.team5.wright_time.model.entity.Session;
import edu.team5.wright_time.model.entity.User;
import edu.team5.wright_time.model.repository.SessionRepository;
import edu.team5.wright_time.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.WeekFields;
import java.util.Locale;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;

    @Autowired
    public UserController(UserRepository userRepository, SessionRepository sessionRepository) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
    }

    @GetMapping
    public Iterable<User> getUser(){
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getOneUser(@PathVariable long id) throws NoSuchElementException {
        return userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No user with id: " + id));
    }

    @GetMapping("/{id}/hours")
    public int getHours(@PathVariable long id) throws NoSuchElementException {
        final var locale = Locale.US;
        final var firstDayOfWeek = WeekFields.of(locale).getFirstDayOfWeek();
        final var lastDayOfWeek = DayOfWeek.of(((firstDayOfWeek.getValue() + 5) % DayOfWeek.values().length) + 1);
        final var begin = LocalDate.now(/* tz */).with(TemporalAdjusters.previousOrSame(firstDayOfWeek));
        final var end = LocalDate.now(/* tz */).with(TemporalAdjusters.nextOrSame(lastDayOfWeek));
        final var student = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No student with id: " + id));
        final var sessions = sessionRepository.findSessionByStudentAndDateBetween(student, begin, end);
        var total = 0;
        for (Session session : sessions) {
            total += session.getEndTime() - session.getStartTime();
        }
        return total;
    }

    @PostMapping
    public User addUser(@RequestBody @Valid User user) {
        return userRepository.save(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable long id, @RequestBody @Valid User user) {
        return userRepository.findById(id).map(toUpdate -> {
            toUpdate.setUsername(user.getUsername());
            toUpdate.setFirstName(user.getFirstName());
            toUpdate.setLastName(user.getLastName());
            toUpdate.setRole(user.getRole());
            toUpdate.setDateOfBirth(user.getDateOfBirth());
            toUpdate.setEmail(user.getEmail());
            return userRepository.save(toUpdate);
        }).orElseThrow(() -> new NoSuchElementException("No user with id: " + id));
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable long id) {
        userRepository.deleteById(id);
    }

}

