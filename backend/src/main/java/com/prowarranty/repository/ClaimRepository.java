package com.prowarranty.repository;

import com.prowarranty.model.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim, String> {
    List<Claim> findByWarrantyId(String warrantyId);
}
