package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.backend.backend.model.receiver;

@Repository
public interface ReceiverRepository extends JpaRepository<receiver, Long> {
    // Custom queries (if any) can be defined here
}

