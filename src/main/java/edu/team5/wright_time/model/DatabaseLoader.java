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
        var user1 = new User("jdellock", "ROLE_ADMIN", "Jeremy", "Dellock", "jmd6724@psu.edu", LocalDate.now().minusDays(3));
        var user2 = new User("bwarner", "ROLE_INSTRUCTOR", "Benjamin", "Warner", "bdw5230@psu.edu", LocalDate.now().minusDays(3));
        var user3 = new User("lnguyen", "ROLE_STUDENT", "Long", "Nguyen", "lhn5032@psu.edu", LocalDate.now().minusDays(3));
        var user4 = new User("nnetznik", "ROLE_STUDENT", "Nathaniel", "Netznik", "nhn5049@psu.edu", LocalDate.now().minusDays(3));
        var cert1 = new Certification(user1, aircraft1, LocalDate.now().minusDays(3));
        var cert2 = new Certification(user2, aircraft2, LocalDate.now().minusDays(2));
        var session1 = new Session(user3, user2, aircraft1, 11, LocalDate.now().minusDays(1), Session.State.PENDING, "Rough Landing, work on approach. ", 2);
        var session2 = new Session(user4, user2, aircraft2, 14, LocalDate.now(), Session.State.APPROVED, "No outstanding issues. ", 4);

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

    }
}
