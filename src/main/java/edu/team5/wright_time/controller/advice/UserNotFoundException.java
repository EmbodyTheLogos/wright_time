package edu.team5.wright_time.controller.advice;

public class UserNotFoundException extends Exception{
    public UserNotFoundException(long id)
    {
        super("Could not find user with id: " + id);
    }
}
