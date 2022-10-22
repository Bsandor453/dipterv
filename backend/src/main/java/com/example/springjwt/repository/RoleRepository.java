package com.example.springjwt.repository;

import com.example.springjwt.models.user.ERole;
import com.example.springjwt.models.user.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);

    boolean existsByName(ERole name);
}
