package com.atlantbh.test.reporter.services;

import com.atlantbh.test.reporter.models.OwlUser;
import com.atlantbh.test.reporter.models.OwlUserPrinciple;
import com.atlantbh.test.reporter.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OwlUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        OwlUser owlUser = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User Not Found with username : " + username)
                );

        return OwlUserPrinciple.build(owlUser);
    }
}

