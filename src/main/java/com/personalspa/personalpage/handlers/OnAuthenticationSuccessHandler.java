package com.personalspa.personalpage.handlers;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class OnAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException{
        
        boolean isMaster = authentication.getAuthorities().stream()
                                .anyMatch(granthedAuthority -> granthedAuthority.getAuthority().equals("ROLE_MASTER"));

        boolean isAdmin = authentication.getAuthorities().stream()
                                .anyMatch(granthedAuthority -> granthedAuthority.getAuthority().equals("ROLE_ADMIN"));
        
        if(isMaster){
            setDefaultTargetUrl("/master");
            
            System.out.println("establece la ruta /master");
        }else if(isAdmin){
            setDefaultTargetUrl("/admin");
            
            System.out.println("establece la ruta /admin");
        }else{
            setDefaultTargetUrl("/user");

            
            System.out.println("establece la ruta /user");
        }

        super.onAuthenticationSuccess(request, response, authentication);
    }
    
}
