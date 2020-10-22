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

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private AircraftRepository aircraftRepository;
    private UserRepository userRepository;
    private CertificationRepository certRepository;
    private SessionRepository sessionRepository;

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
        if(type.equals("h2")) {
            var date = new GregorianCalendar(2000, Calendar.MARCH, 2).getTime();

            var aircraft1 = new Aircraft("Manufacturer 1", "Name 1", "Model 1", 1999, 10, 10);
            var aircraft2 = new Aircraft("Manufacturer 2", "Name 2", "Model 2", 2019, 6, 15);
            var user1 = new User("username1", "role1", "fname1", "lname2", "email1@gmail.com", (Date) date.clone());
            var user2 = new User("username2", "role2", "fname2", "lname2", "email2@gmail.com", (Date) date.clone());
            var cert1 = new Certification(user1, aircraft1, (Date) date.clone());
            var cert2 = new Certification(user2, aircraft2, (Date) date.clone());
            var session1 = new Session(user1, user2, aircraft1, 2300, 2359, (Date) date.clone(), Session.State.PENDING, "ok", 2);
            var session2 = new Session(user1, user2, aircraft2, 2300, 2359, (Date) date.clone(), Session.State.PENDING, "bad", 1);

            aircraftRepository.save(aircraft1);
            aircraftRepository.save(aircraft2);

            userRepository.save(user1);
            userRepository.save(user2);

            certRepository.save(cert1);
            certRepository.save(cert2);

            sessionRepository.save(session1);
            sessionRepository.save(session2);
        }
    }
}
