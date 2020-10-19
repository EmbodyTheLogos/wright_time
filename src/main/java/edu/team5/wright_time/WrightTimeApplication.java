package edu.team5.wright_time;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class WrightTimeApplication {

    public static void main(String[] args) {
        SpringApplication.run(WrightTimeApplication.class, args);
    }

}
