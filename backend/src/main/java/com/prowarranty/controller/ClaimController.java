package com.prowarranty.controller;

import com.prowarranty.model.Claim;
import com.prowarranty.service.ClaimService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {
    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @PostMapping
    public ResponseEntity<?> submitClaim(@RequestBody Claim claim) {
        Claim saved = claimService.createClaim(claim);
        Map<String, Object> response = new HashMap<>();
        response.put("data", saved);
        return ResponseEntity.ok(response);
    }
}
