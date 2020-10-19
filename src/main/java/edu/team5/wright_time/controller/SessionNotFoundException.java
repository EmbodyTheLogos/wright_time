package edu.team5.wright_time.controller;

public class SessionNotFoundException extends Exception{
    public SessionNotFoundException(int id)
    {
        super("Cannot find session with id: "+id);
    }
}
