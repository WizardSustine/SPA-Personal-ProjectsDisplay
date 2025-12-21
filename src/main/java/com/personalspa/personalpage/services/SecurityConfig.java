package com.personalspa.personalpage.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractAuthenticationFilterConfigurer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Autowired
	private UserService userService;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(AbstractHttpConfigurer::disable)
			.authorizeHttpRequests((authorize) -> {
				authorize.requestMatchers("/login", "/register/**", "/", "/projects/**").permitAll();
				authorize.requestMatchers("/admin/**", "/project/**").hasRole("MASTER");
				authorize.requestMatchers("/admin/**", "/project/save/**").hasRole("ADMIN");
				authorize.requestMatchers("/user/**").hasAnyRole("USER", "ADMIN", "MASTER");
				authorize.anyRequest().authenticated();
			})
			.formLogin(AbstractAuthenticationFilterConfigurer::permitAll);
			
		return http.build();
	}

	@Bean
	public UserDetailsService userDetailsService() {
		return userService;
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(userService);
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}