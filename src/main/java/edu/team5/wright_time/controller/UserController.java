package edu.team5.wright_time.controller;

import edu.team5.wright_time.controller.advice.UserNotFoundException;
import edu.team5.wright_time.model.entity.User;
import edu.team5.wright_time.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public Iterable<User> getUser(){
        return userRepository.findAll();
    }

    @PostMapping
    public User addUser(@RequestBody @Valid User user) {
        return userRepository.save(user);
    }

    @GetMapping("/{id}")
    public User getOneUser(@PathVariable int id) throws UserNotFoundException {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable int id, @RequestBody @Valid User user) {
        return userRepository.findById(id).map(toUpdate -> {
            toUpdate.setUsername(user.getUsername());
            toUpdate.setFirstName(user.getFirstName());
            toUpdate.setLastName(user.getLastName());
            toUpdate.setRole(user.getRole());
            toUpdate.setDateJoined(user.getDateJoined());
            toUpdate.setDateOfBirth(user.getDateOfBirth());
            toUpdate.setEmail(user.getEmail());

            return userRepository.save(toUpdate);
        }).orElseGet(() -> {
            user.setUserId(id);
            return userRepository.save(user);
        });
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        userRepository.deleteById(id);
    }

}

