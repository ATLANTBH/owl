package com.atlantbh.test.reporter.controllers;


import com.atlantbh.test.reporter.auth.JwtProvider;
import com.atlantbh.test.reporter.auth.JwtResponse;
import com.atlantbh.test.reporter.models.OwlUser;
import com.atlantbh.test.reporter.models.OwlUserPrinciple;
import com.atlantbh.test.reporter.repositories.UserRepository;

import io.jsonwebtoken.ExpiredJwtException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * Authentication controller. All authentication related APIs entries are here.
 *
 * @author Kristina Kraljevic
 */
@RestController
@RequestMapping(value = "/api/v1/auth")
public class AuthenticationController {
    private static final Logger LOGGER = Logger.getLogger(AuthenticationController.class);

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtProvider jwtProvider;

    @CrossOrigin
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody OwlUser owlUser) {
        if(!owlUser.getUsername().isEmpty() && owlUser.getPassword().length() > 7 ) {
            if(userRepository.existsByUsername(owlUser.getUsername())) {
                return new ResponseEntity<>("Username is taken! Enter another one.",
                        HttpStatus.BAD_REQUEST);
            }
            owlUser.setId(null);
            owlUser.setPassword(encoder.encode(owlUser.getPassword()));
        }
        else {
            return new ResponseEntity<>("Username and password are not valid!",
                    HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(userRepository.save(owlUser));
    }

    @CrossOrigin( origins = "*")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody OwlUser owlUser) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(owlUser.getUsername(),owlUser.getPassword())
        );
        String jwt = jwtProvider.generateJwtToken(authentication);
        return ResponseEntity.ok(new JwtResponse(jwt, (OwlUserPrinciple) authentication.getPrincipal()));
    }

}
