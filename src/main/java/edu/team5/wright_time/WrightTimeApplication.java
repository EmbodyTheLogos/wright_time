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
            if (repository.findAll().iterator().hasNext()) {
                repository.save(new Aircraft("Manufacturer 1", "Name 1", "Model 1", 1999, 10, 10));
                repository.save(new Aircraft("Manufacturer 2", "Name 2", "Model 2", 2019, 6, 15));
            }
        };
    }

}
