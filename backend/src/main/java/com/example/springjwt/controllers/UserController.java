package com.example.springjwt.controllers;

import com.example.springjwt.dto.request.UserProfileUpdateRequest;
import com.example.springjwt.dto.response.UserProfileResponse;
import com.example.springjwt.security.services.UserDetailsImpl;
import com.example.springjwt.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"http://localhost:8081", "http://192.168.0.17:8081"}, maxAge = 3600)
@RestController
@RequestMapping("/api/user")
@PreAuthorize("hasRole('ROLE_USER')")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getUserProfile() {
        UserDetailsImpl user = userService.getCurrentUser();

        List<String> roles =
                user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());

        return ResponseEntity.ok(
                new UserProfileResponse(user.getUsername(), user.getFullName(), roles, user.getEmail()));
    }

    @PostMapping("/profile/update")
    public ResponseEntity<String> updateUserProfile(@RequestBody UserProfileUpdateRequest updatedUserData) {
        boolean relogRequired = userService.updateUser(updatedUserData);
        if (!relogRequired) {
            return ResponseEntity.ok("User profile successfully updated.");
        } else {
            return ResponseEntity.ok("User profile successfully updated. Relog required.");
        }
    }
}