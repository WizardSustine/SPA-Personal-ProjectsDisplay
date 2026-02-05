package com.personalspa.personalpage.enviroments;

import org.springframework.stereotype.Component;



@Component
public class Enviroments {

    //@Value("${app.front.url}")
    public static final String FRONT_URL = "http://localhost:4200";
    
    //@Value("${jwt.secretkey}")
    public static final String JWT_SECRET_KEY = "eb21466f0210d81b5018da6fae689d113459f6a9f4e0c84ce1f2b67810117632" ;
    // Advice 32 characters
    
    //@Value("${jwt.expiration}")
    public static final int JWT_EXPIRATION = 1800000;
    // 1.800.000 millis = 1/2 hora...


    public void play(){
        System.out.println("Cross Origin from " + FRONT_URL);
        
        System.out.println("Secret JWT Key " + JWT_SECRET_KEY);

        System.out.println("Expiration JWT Token " + String.valueOf(JWT_EXPIRATION));

    }
    
}
