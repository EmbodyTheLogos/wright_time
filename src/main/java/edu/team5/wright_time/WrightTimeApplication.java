package edu.team5.wright_time;

import edu.team5.wright_time.model.entity.Aircraft;
import edu.team5.wright_time.model.entity.User;
import edu.team5.wright_time.model.repository.AircraftRepository;
import edu.team5.wright_time.model.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

import java.util.Date;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class WrightTimeApplication {

    public static void main(String[] args) {
        SpringApplication.run(WrightTimeApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(AircraftRepository repository, UserRepository userRepository) {
        return (args) -> {
            if (!repository.findAll().iterator().hasNext()) {
                repository.save(new Aircraft("Manufacturer 1", "Name 1", "Model 1", 1999, 10, 10));
                repository.save(new Aircraft("Manufacturer 2", "Name 2", "Model 2", 2019, 6, 15));
            }

            if (!userRepository.findAll().iterator().hasNext()) {
                userRepository.save(new User("username1", "role1", "fname1", "lname2", "email1@gmail.com", new Date(2000, 2, 2), new Date(2000, 2, 2)));
                userRepository.save(new User("username2", "role2", "fname2", "lname2", "email2@gmail.com", new Date(2000, 2, 2), new Date(2000, 2, 2)));
            }
        };
    }

}
