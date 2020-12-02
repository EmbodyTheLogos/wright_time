package edu.team5.wright_time.controller;

import edu.team5.wright_time.model.entity.Aircraft;
import edu.team5.wright_time.model.entity.Certification;
import edu.team5.wright_time.model.entity.Session;
import edu.team5.wright_time.model.entity.User;
import edu.team5.wright_time.model.repository.AircraftRepository;
import edu.team5.wright_time.model.repository.CertificationRepository;
import edu.team5.wright_time.model.repository.SessionRepository;
import edu.team5.wright_time.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.Locale;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;
    private final CertificationRepository certificationRepository;
    private final AircraftRepository aircraftRepository;

    @Autowired
    public UserController(UserRepository userRepository, SessionRepository sessionRepository, CertificationRepository certificationRepository, AircraftRepository aircraftRepository) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.certificationRepository = certificationRepository;
        this.aircraftRepository = aircraftRepository;

    }

    @GetMapping
    @Secured({ "ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN" })
    public Iterable<User> getUser(){
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    @Secured({ "ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN" })
    public User getOneUser(@PathVariable long id) throws NoSuchElementException {
        return userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No user with id: " + id));
    }

    @GetMapping("/instructors/certified/{id}")
    @Secured({ "ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN" })
    public Iterable<User> getCertifiedInstructors(@PathVariable long id) throws NoSuchElementException
    {
        Aircraft aircraft = aircraftRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No aircraft with id: " + id));
        Iterable<Certification> certifications = certificationRepository.findCertificationByAircraft(aircraft);
        ArrayList<Long> instructorID = new ArrayList<>();
        for(Certification certification : certifications)
        {
            if (certification.getUser().getRole().equals("ROLE_INSTRUCTOR"))
            {
                instructorID.add(certification.getUser().getId());
            }
        }
        if(instructorID.isEmpty())
        {
            throw new NoSuchElementException("No instructor is certified for aircraft with id "+id);
        }

        Iterable<Long> certifiedInstructorsID = instructorID;
        return userRepository.findAllById(certifiedInstructorsID);
    }
    @GetMapping("/administrators")
    @Secured({ "ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN" })
    public Iterable<User> getAllAdministrators()
    {
        return userRepository.findUsersByRole("ROLE_ADMIN");
    }
    @GetMapping("/instructors")
    @Secured({ "ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN" })
    public Iterable<User> getAllInstructors()
    {
        return userRepository.findUsersByRole("ROLE_INSTRUCTOR");
    }
    @GetMapping("/students")
    @Secured({ "ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN" })
    public Iterable<User> getAllStudents()
    {
        return userRepository.findUsersByRole("ROLE_STUDENT");
    }

    @GetMapping("/{id}/hours")
    @Secured({ "ROLE_STUDENT", "ROLE_INSTRUCTOR", "ROLE_ADMIN" })
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
            total += session.getAircraft().getTrainingDuration();
        }
        return total;
    }

    @PostMapping
    @Secured("ROLE_ADMIN")
    public User addUser(@RequestBody @Valid User user) {
        return userRepository.save(user);
    }

    @PutMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public User updateUser(@PathVariable long id, @RequestBody @Valid User user) {
        return userRepository.findById(id).map(toUpdate -> {
            toUpdate.setFirstName(user.getFirstName());
            toUpdate.setLastName(user.getLastName());
            toUpdate.setRole(user.getRole());
            toUpdate.setDateOfBirth(user.getDateOfBirth());
            toUpdate.setEmail(user.getEmail());
            return userRepository.save(toUpdate);
        }).orElseThrow(() -> new NoSuchElementException("No user with id: " + id));
    }

    @DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public void deleteUser(@PathVariable long id) {
        userRepository.deleteById(id);
    }

}

