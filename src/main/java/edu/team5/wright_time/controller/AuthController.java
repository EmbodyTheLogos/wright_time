package edu.team5.wright_time.controller;

import edu.team5.wright_time.controller.requests.ChangePasswordRequest;
import edu.team5.wright_time.controller.requests.LoginRequest;
import edu.team5.wright_time.controller.responce.ApiResponse;
import edu.team5.wright_time.controller.responce.AuthenticationResponse;
import edu.team5.wright_time.model.entity.User;
import edu.team5.wright_time.model.repository.UserRepository;
import edu.team5.wright_time.security.JwtTokenProvider;
import edu.team5.wright_time.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:3000")
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
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @PostMapping("/change_password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth == null || auth.getPrincipal().equals("anonymousUser")) {
            return null;
        }
        final var user =  userRepository.findById(((UserPrincipal) auth.getPrincipal()).getId()).orElseThrow(() -> new NoSuchElementException("No user login "));
        user.setPassword(changePasswordRequest.getPassword());

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{id}")
                .buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(location).body(new ApiResponse(true, "User password changed successfully"));
    }
}
