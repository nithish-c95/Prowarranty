package com.prowarranty.repository;

import com.prowarranty.model.Warranty;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WarrantyRepository extends JpaRepository<Warranty, String> {
    List<Warranty> findByUserId(String userId);
}
