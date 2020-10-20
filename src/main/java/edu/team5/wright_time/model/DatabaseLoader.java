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
            aircraftRepository.save(new Aircraft("Manufacturer 1", "Name 1", "Model 1", 1999, 10, 10));
            aircraftRepository.save(new Aircraft("Manufacturer 2", "Name 2", "Model 2", 2019, 6, 15));

            userRepository.save(new User("username1", "role1", "fname1", "lname2", "email1@gmail.com", new GregorianCalendar(2000, Calendar.MARCH, 2).getTime(), new GregorianCalendar(2000, Calendar.MARCH, 2).getTime()));
            userRepository.save(new User("username2", "role2", "fname2", "lname2", "email2@gmail.com", new GregorianCalendar(2000, Calendar.MARCH, 2).getTime(), new GregorianCalendar(2000, Calendar.MARCH, 2).getTime()));

            var allAircraft = aircraftRepository.findAll().iterator();
            var allUsers = userRepository.findAll().iterator();
            for (int i = 0; i < 2; i++) {
                var aircraft = allAircraft.next();
                var user = allUsers.next();
                certRepository.save(new Certification(user.getUserId(), aircraft.getAircraftId(), new GregorianCalendar(2000, Calendar.MARCH, 2).getTime()));
            }

            sessionRepository.save(new Session(1, 1, 1, "2300", "2300", new GregorianCalendar(2000, Calendar.MARCH, 2).getTime(), "pending", "ok", 2));
            sessionRepository.save(new Session(2, 3, 3, "2359", "2359", new GregorianCalendar(2000, Calendar.MARCH, 2).getTime(), "pending", "ok", 2));
        }
    }
}
