package com.example.springjwt.controllers;

import com.example.springjwt.dto.request.LoginRequest;
import com.example.springjwt.dto.request.SignupRequest;
import com.example.springjwt.dto.request.TokenRefreshRequest;
import com.example.springjwt.dto.response.JwtResponse;
import com.example.springjwt.dto.response.MessageResponse;
import com.example.springjwt.dto.response.TokenRefreshResponse;
import com.example.springjwt.exception.TokenRefreshException;
import com.example.springjwt.models.transaction.TransactionHistory;
import com.example.springjwt.models.user.ERole;
import com.example.springjwt.models.user.RefreshToken;
import com.example.springjwt.models.user.Role;
import com.example.springjwt.models.user.User;
import com.example.springjwt.models.wallet.Wallet;
import com.example.springjwt.repository.RoleRepository;
import com.example.springjwt.repository.TransactionRepository;
import com.example.springjwt.repository.UserRepository;
import com.example.springjwt.repository.WalletRepository;
import com.example.springjwt.security.jwt.JwtUtils;
import com.example.springjwt.security.services.RefreshTokenService;
import com.example.springjwt.security.services.UserDetailsImpl;
import com.example.springjwt.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = {"http://localhost:8081", "http://192.168.0.17:8081"}, maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;
    private final UserService userService;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;
    @Value("${bsandor.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
                          WalletRepository walletRepository, TransactionRepository transactionRepository,
                          UserService userService, RoleRepository roleRepository, PasswordEncoder encoder,
                          JwtUtils jwtUtils, RefreshTokenService refreshTokenService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.walletRepository = walletRepository;
        this.transactionRepository = transactionRepository;
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl user = userService.getCurrentUser();
        String accessToken = jwtUtils.generateJwtToken(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

        return ResponseEntity.ok(
                new JwtResponse(user.getUsername(), accessToken, refreshToken.getToken(), jwtExpirationMs / 1000));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUserName())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Email is already in use!"));
        }

        // Create new user account
        User user = new User(signUpRequest.getUserName(), signUpRequest.getFullName(), signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        Wallet wallet = new Wallet(0.0, new HashMap<>());
        TransactionHistory transactionHistory = new TransactionHistory();

        walletRepository.save(wallet);
        transactionRepository.save(transactionHistory);

        user.setRoles(roles);
        user.setWallet(wallet);
        user.setTransactionHistory(transactionHistory);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken).map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser).map(user -> {
                    String token = jwtUtils.generateTokenFromUsername(user.getUsername());
                    return ResponseEntity.ok(new TokenRefreshResponse(user.getUsername(), token, requestRefreshToken,
                            jwtExpirationMs / 1000));
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken, "Refresh token is not in database!"));
    }

}
