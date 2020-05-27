package com.atlantbh.test.reporter.auth;

import com.atlantbh.test.reporter.models.OwlUserPrinciple;
import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;

    private final String jwttoken;

    private List<String> roles;

    private Long id;

    public JwtResponse(String jwttoken, OwlUserPrinciple owlUserPrinciple) {

        this.jwttoken = jwttoken;
        this.id=owlUserPrinciple.getId();
        this.roles= owlUserPrinciple.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
    }

    public String getToken() {
        return this.jwttoken;
    }

    public Long getId() {
        return id;
    }

    public List<String> getRoles() {
        return roles;
    }
}
