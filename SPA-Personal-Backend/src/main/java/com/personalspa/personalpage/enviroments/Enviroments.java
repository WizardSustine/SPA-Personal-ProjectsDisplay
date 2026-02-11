package com.personalspa.personalpage.enviroments;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;



@Component
public class Enviroments {

    @Value("${cors.allowed-origins}")
    public static String FRONT_URL;
    
    @Value("${jwt.secret}")
    public static String JWT_SECRET_KEY;
    // Advice 32 characters
    
    //@Value("${jwt.expiration}")
    public static final int JWT_EXPIRATION = 1800000;
    // 1.800.000 millis = 1/2 hora...

    public static String getFRONT_URL() {
        return FRONT_URL;
    }

    public static String getJWT_SECRET_KEY() {
        return JWT_SECRET_KEY;
    }



    public void play(){
        System.out.println("Cross Origin from " + FRONT_URL);
        
        System.out.println("Secret JWT Key " + JWT_SECRET_KEY);

        System.out.println("Expiration JWT Token " + String.valueOf(JWT_EXPIRATION));

    }
    
}
