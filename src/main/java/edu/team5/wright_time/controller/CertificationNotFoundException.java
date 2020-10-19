package edu.team5.wright_time.controller;

public class CertificationNotFoundException extends Exception{
    public CertificationNotFoundException(long id)
    {
        super("Cannot find certification with id: "+ id);
    }
}
