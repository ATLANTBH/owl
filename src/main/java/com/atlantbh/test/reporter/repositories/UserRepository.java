package com.atlantbh.test.reporter.repositories;


import com.atlantbh.test.reporter.models.OwlUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Owl User related database operations are defined here.
 *
 * @author Kristina Kraljevic
 */
public interface UserRepository extends JpaRepository<OwlUser, Long> {

    /**
     * Finds owl user with given username.
     *
     * @param username The owl username.
     * @return Optional response of owl user for given username if exists.
     */
    Optional<OwlUser> findByUsername(String username);
    Optional<OwlUser> findByPassword(String psw);

    /**
     * Checks if owl user with given username exists.
     *
     * @param username The owl username to look for.
     * @return Boolean response according to existence of owl user for given username.
     */
    boolean existsByUsername(String username);

}
