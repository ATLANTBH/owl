package com.atlantbh.test.reporter.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * OwlUser model.
 *
 * @author Kristina Kraljevic
 */
@Table(name = "owl_users")
@Entity
public class OwlUser implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "owl_users_id_seq", sequenceName = "owl_users_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "owl_users_id_seq")
    private Long id;

    @Column(name = "owl_username", nullable = false, unique = true)
    @Size(max = 100)
    private String username;

    @Column(name = "owl_password", nullable = false)
    @Size(min = 8, max = 100)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    /**
     * Instantiates a new Owl user.
     */
    public OwlUser() {

    }

    public OwlUser(Long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    /**
     * Gets id.
     *
     * @return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets id.
     *
     * @param id the id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Gets owl username.
     *
     * @return the owl username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets owl username.
     *
     * @param username the owl username
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Gets owl password.
     *
     * @return the owl password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets owl password.
     *
     * @param password the owl password
     */
    public void setPassword(String password) {
        this.password = password;
    }
}

