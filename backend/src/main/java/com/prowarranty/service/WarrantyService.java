package com.prowarranty.service;

import com.prowarranty.model.Warranty;
import com.prowarranty.repository.WarrantyRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class WarrantyService {
    private final WarrantyRepository warrantyRepository;

    public WarrantyService(WarrantyRepository warrantyRepository) {
        this.warrantyRepository = warrantyRepository;
    }

    public List<Warranty> getAllWarranties() {
        return warrantyRepository.findAll();
    }

    public List<Warranty> getWarrantiesByUser(String userId) {
        return warrantyRepository.findByUserId(userId);
    }

    public Warranty createWarranty(Warranty warranty) {
        warranty.setStatus("Active");
        return warrantyRepository.save(warranty);
    }
}
