package edu.team5.wright_time.model.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int userId;

    @NotEmpty(message="Username cannot be empty")
    private String username;

    @NotEmpty(message="User role cannot be empty")
    @Size(min=0,max=255,message="User role cannot exceed 255 characters")
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

//    @Past(message="Must enter a valid date")
    private Date dateOfBirth;

//    @PastOrPresent(message="Must enter a valid date")
    private Date dateJoined;

    public User(String username, String role, String firstName, String lastName, String email, Date dateOfBirth, Date dateJoined) {
        this.username = username;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.dateJoined = dateJoined;
    }

    public User() {
    }
}
