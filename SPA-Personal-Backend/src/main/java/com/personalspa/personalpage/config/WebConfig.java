package com.personalspa.personalpage.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.personalspa.personalpage.enviroments.Enviroments;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(Enviroments.FRONT_URL) // URL de tu frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}