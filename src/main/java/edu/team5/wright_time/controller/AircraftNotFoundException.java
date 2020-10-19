package edu.team5.wright_time.controller;

public class AircraftNotFoundException extends Exception{
    public AircraftNotFoundException(long id)
    {
        super("Could not find aircraft with id: " + id);
    }
}
