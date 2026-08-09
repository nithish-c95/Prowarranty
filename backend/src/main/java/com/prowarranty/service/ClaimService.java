package com.prowarranty.service;

import com.prowarranty.model.Claim;
import com.prowarranty.repository.ClaimRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ClaimService {
    private final ClaimRepository claimRepository;

    public ClaimService(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }

    public List<Claim> getClaimsByWarranty(String warrantyId) {
        return claimRepository.findByWarrantyId(warrantyId);
    }

    public Claim createClaim(Claim claim) {
        claim.setStatus("Pending Review");
        claim.setDateSubmitted(LocalDate.now());
        return claimRepository.save(claim);
    }
}
