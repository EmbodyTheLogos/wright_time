package edu.team5.wright_time.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.tomcat.jni.Local;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    @NotEmpty(message="Username cannot be empty")
    private String username;

    @NotEmpty(message="User role cannot be empty")
    @Size(min=0,max=255,message="User role cannot exceed 255 characters") //TODO: restrict to ROLE_ADMIN, ROLE_STUDENT, ROLE_INSTRUCTOR
    private String role;

    @NotEmpty(message="First name cannot be empty")
    @Size(min=0,max=255,message="First name cannot exceed 255 characters")
    private String firstName;

    @NotEmpty(message="Last name cannot be empty")
    @Size(min=0,max=255,message="Last name cannot exceed 255 characters")
    private String lastName;

    @NotEmpty(message="Email address cannot be empty")
    @Email(message="Must enter a valid email address")
    private String email;

    @Past(message="Must enter a valid date")
    private LocalDate dateOfBirth;

    public User(String username, String role, String firstName, String lastName, String email, LocalDate dateOfBirth) {
        this.username = username;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }

    public User() {
    }
}
