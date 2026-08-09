package com.prowarranty.controller;

import com.prowarranty.model.User;
import com.prowarranty.service.UserService;
import com.prowarranty.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        var authToken = new UsernamePasswordAuthenticationToken(email, password);
        authenticationManager.authenticate(authToken);
        final UserDetails userDetails = userService.loadUserByUsername(email);
        String token = jwtUtil.generateToken(userDetails.getUsername(), new HashMap<>());
        User user = userService.findByEmail(email);
        Map<String, Object> userResponse = userService.buildUserResponse(user);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("token", token);
        response.put("user", userResponse);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        String email = request.get("email");
        String password = request.get("password");
        if (userService.emailExists(email)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already registered"));
        }
        User user = userService.register(name, email, password);
        final UserDetails userDetails = userService.loadUserByUsername(email);
        String token = jwtUtil.generateToken(userDetails.getUsername(), new HashMap<>());
        Map<String, Object> userResponse = userService.buildUserResponse(user);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("token", token);
        response.put("user", userResponse);
        return ResponseEntity.ok(response);
    }
}
