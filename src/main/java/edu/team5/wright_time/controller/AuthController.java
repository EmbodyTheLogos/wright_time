package edu.team5.wright_time.controller;

import edu.team5.wright_time.controller.requests.ApiResponse;
import edu.team5.wright_time.controller.requests.JwtAuthenticationResponse;
import edu.team5.wright_time.controller.requests.LoginRequest;
import edu.team5.wright_time.controller.requests.SignupRequest;
import edu.team5.wright_time.model.entity.User;
import edu.team5.wright_time.model.repository.UserRepository;
import edu.team5.wright_time.security.JwtTokenProvider;
import edu.team5.wright_time.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final JwtTokenProvider tokenProvider;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.tokenProvider = tokenProvider;
    }

    @GetMapping("user")
    public User currentUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth == null || auth.getPrincipal().equals("anonymousUser")) {
            return null;
        }
        return userRepository.findById(((UserPrincipal) auth.getPrincipal()).getId()).get();
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        var user = new User(signUpRequest.getEmail(), signUpRequest.getPassword(), signUpRequest.getFirstName(), signUpRequest.getLastName(), "ROLE_STUDENT", LocalDate.now());
        var result = userRepository.save(user);
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(result.getEmail()).toUri();
        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
}
