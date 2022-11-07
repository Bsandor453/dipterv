package com.bsandor.stocksimulator.services;

import com.bsandor.stocksimulator.dto.request.UserProfileUpdateRequest;
import com.bsandor.stocksimulator.exception.UserNotFoundException;
import com.bsandor.stocksimulator.exception.UsernameAlreadyInUseException;
import com.bsandor.stocksimulator.models.user.User;
import com.bsandor.stocksimulator.repository.UserRepository;
import com.bsandor.stocksimulator.security.services.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public boolean updateUser(UserProfileUpdateRequest updatedUserData)
            throws UserNotFoundException, UsernameAlreadyInUseException {
        String username = getCurrentUser().getUsername();
        logger.info(String.format("Updating user with username '%s'...", username));

        User updatedUser = getCurrentUserEntity();

        // Check if the username already exists or not (except when the username is the same, meaning updating other
        // data)
        if (userRepository.findByUsername(updatedUserData.getUserName()).isPresent() &&
                !username.equals(updatedUserData.getUserName())) {
            throw new UsernameAlreadyInUseException(updatedUserData.getUserName());
        }

        updatedUser.setUsername(updatedUserData.getUserName());
        updatedUser.setFullName(updatedUserData.getFullName());
        updatedUser.setEmail(updatedUserData.getEmail());
        userRepository.save(updatedUser);

        logger.info(String.format("Successfully updated user with username '%s' (new name: '%s')", username,
                updatedUser.getUsername()));

        return !username.equals(updatedUserData.getUserName());
    }

    public UserDetailsImpl getCurrentUser() {
        return (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public User getCurrentUserEntity() {
        String username = getCurrentUser().getUsername();
        return userRepository.findById(getCurrentUser().getId()).orElseThrow(() -> new UserNotFoundException(username));
    }

}


