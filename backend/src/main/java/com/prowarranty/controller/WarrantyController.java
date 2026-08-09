package com.prowarranty.controller;

import com.prowarranty.model.Warranty;
import com.prowarranty.service.WarrantyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/warranties")
public class WarrantyController {
    private final WarrantyService warrantyService;

    public WarrantyController(WarrantyService warrantyService) {
        this.warrantyService = warrantyService;
    }

    @GetMapping
    public ResponseEntity<?> getAllWarranties() {
        List<Warranty> warranties = warrantyService.getAllWarranties();
        Map<String, Object> response = new HashMap<>();
        response.put("data", warranties);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> createWarranty(@RequestBody Warranty warranty) {
        Warranty saved = warrantyService.createWarranty(warranty);
        Map<String, Object> response = new HashMap<>();
        response.put("data", saved);
        return ResponseEntity.ok(response);
    }
}
