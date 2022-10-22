package com.example.springjwt.procedure;

import com.example.springjwt.models.user.ERole;
import com.example.springjwt.models.user.Role;
import com.example.springjwt.repository.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
@Slf4j
public class InitDatabase {

    RoleRepository roleRepository;

    @Autowired
    public InitDatabase(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void init() {
        log.info("Initializing database");
        initRoles();
    }

    public void initRoles() {
        for (ERole role : ERole.values()) {
            if (!roleRepository.existsByName(role)) {
                Role newRole = new Role(role);
                roleRepository.save(newRole);
            }
        }
    }


}
