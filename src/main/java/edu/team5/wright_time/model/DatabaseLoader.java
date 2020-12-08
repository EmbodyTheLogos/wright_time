package edu.team5.wright_time.model;

import edu.team5.wright_time.model.entity.Aircraft;
import edu.team5.wright_time.model.entity.Certification;
import edu.team5.wright_time.model.entity.Session;
import edu.team5.wright_time.model.entity.User;
import edu.team5.wright_time.model.repository.AircraftRepository;
import edu.team5.wright_time.model.repository.CertificationRepository;
import edu.team5.wright_time.model.repository.SessionRepository;
import edu.team5.wright_time.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final AircraftRepository aircraftRepository;
    private final UserRepository userRepository;
    private final CertificationRepository certRepository;
    private final SessionRepository sessionRepository;

    @Autowired
    public DatabaseLoader(AircraftRepository aircraftRepository, UserRepository userRepository, CertificationRepository certRepository, SessionRepository sessionRepository) {
        this.aircraftRepository = aircraftRepository;
        this.userRepository = userRepository;
        this.certRepository = certRepository;
        this.sessionRepository = sessionRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        String type = System.getenv("database.type");
        var aircraft1 = new Aircraft("Cessna", "Skyhawk", "172", 1997, 6, 3);
        var aircraft2 = new Aircraft("Piper Aircraft", "Cherokee", "PA-28", 2002, 19, 3);
        var aircraft3 = new Aircraft("Beechcraft", "Bonanza", "S35", 2007, 20, 4);
        var aircraft4 = new Aircraft("Douglas", "Skytrain", "C-47", 1945, 28, 6);
        var user1 = new User("jmd6724@psu.edu", "password",  "Jeremy", "Dellock", "ROLE_ADMIN", LocalDate.now().minusDays(3));
        var user2 = new User("bdw5230@psu.edu", "password",  "Benjamin", "Warner", "ROLE_INSTRUCTOR", LocalDate.now().minusDays(3));
        var user3 = new User("lhn5032@psu.edu", "password",  "Long", "Nguyen", "ROLE_STUDENT", LocalDate.now().minusDays(3));
        var user4 = new User("nhn5049@psu.edu", "password",  "Nathaniel", "Netznik", "ROLE_STUDENT", LocalDate.now().minusDays(3));
        var cert1 = new Certification(user1, aircraft1, LocalDate.now().minusDays(3));
        var cert2 = new Certification(user2, aircraft2, LocalDate.now().minusDays(2));
        var session1 = new Session(user3, user2, aircraft1, 11, LocalDate.now().plusDays(1), Session.State.PENDING, "Rough Landing, work on approach. ", 2);
        var session2 = new Session(user4, user2, aircraft2, 14, LocalDate.now(), Session.State.APPROVED, "No outstanding issues. ", 4);
        var session3 = new Session(user3, user2, aircraft2, 10, LocalDate.of(2019, 2, 25), Session.State.PENDING, "No comment", 3);
        var session4 = new Session(user3, user2, aircraft3, 8, LocalDate.of(2018, 9, 4), Session.State.COMPLETE, "Good work", 5);
        var session5 = new Session(user3, user2, aircraft4, 20, LocalDate.of(2019, 12, 31), Session.State.CANCELED, "Student had to reschedule", 1);
        var session6 = new Session(user3, user2, aircraft1, 15, LocalDate.of(2020,2,29), Session.State.DECLINED, "Admin declined", 4);
        aircraftRepository.save(aircraft1);
        aircraftRepository.save(aircraft2);
        aircraftRepository.save(aircraft3);
        aircraftRepository.save(aircraft4);

        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);
        userRepository.save(user4);

        certRepository.save(cert1);
        certRepository.save(cert2);

        sessionRepository.save(session1);
        sessionRepository.save(session2);
        sessionRepository.save(session3);
        sessionRepository.save(session4);
        sessionRepository.save(session5);
        sessionRepository.save(session6);

    }
}
