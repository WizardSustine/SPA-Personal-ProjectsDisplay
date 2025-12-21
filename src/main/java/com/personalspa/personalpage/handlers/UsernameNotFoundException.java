package com.personalspa.personalpage.handlers;

public class UsernameNotFoundException extends RuntimeException {
    public UsernameNotFoundException(String username) {
        super("Could not find user " + username);
    }
}
