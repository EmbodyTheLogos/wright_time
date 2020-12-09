package edu.team5.wright_time.controller.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddUserRequest {
    @NotEmpty(message="Email address cannot be empty")
    @Email(message="Must enter a valid email address")
    private String email;

    @NotEmpty
    private String password;

    @NotEmpty(message="First name cannot be empty")
    @Size(max=255,message="First name cannot exceed 255 characters")
    private String firstName;

    @NotEmpty(message="Last name cannot be empty")
    @Size(max=255,message="Last name cannot exceed 255 characters")
    private String lastName;

    @NotEmpty(message="User role cannot be empty")
    @Size(max=255,message="User role cannot exceed 255 characters")
    private String role;

    @PastOrPresent(message="Must enter a valid date of birth")
    private LocalDate dateOfBirth;
}
