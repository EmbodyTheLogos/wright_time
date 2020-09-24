package edu.team5.wright_time;

import edu.team5.wright_time.model.entity.Aircraft;
import edu.team5.wright_time.model.repository.AircraftRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class WrightTimeApplication {

    public static void main(String[] args) {
        SpringApplication.run(WrightTimeApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(AircraftRepository repository) {
        return (args) -> {
            repository.save(new Aircraft("A", "B"));
            repository.save(new Aircraft("C", "D"));
        };
    }

}
