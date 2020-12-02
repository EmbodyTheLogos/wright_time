package edu.team5.wright_time.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.team5.wright_time.security.SecurityConfiguration;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    @NotEmpty(message="Email address cannot be empty")
    @Email(message="Must enter a valid email address")
    private String email;

    @JsonIgnore
    private String password;

    @NotEmpty(message="First name cannot be empty")
    @Size(min=0,max=255,message="First name cannot exceed 255 characters")
    private String firstName;

    @NotEmpty(message="Last name cannot be empty")
    @Size(min=0,max=255,message="Last name cannot exceed 255 characters")
    private String lastName;

    @NotEmpty(message="User role cannot be empty")
    @Size(min=0,max=255,message="User role cannot exceed 255 characters") //TODO: restrict to ROLE_ADMIN, ROLE_STUDENT, ROLE_INSTRUCTOR
    private String role;

    @PastOrPresent(message="Must enter a valid date")
    private LocalDate dateOfBirth;

    public User(String email, String password, String firstName, String lastName, String role,  LocalDate dateOfBirth) {
        this.email = email;
        setPassword(password);
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.dateOfBirth = dateOfBirth;
    }

    public void setPassword(String password) {
        this.password = SecurityConfiguration.PASSWORD_ENCODER.encode(password);
    }
}
