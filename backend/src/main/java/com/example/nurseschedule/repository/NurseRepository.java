package com.example.nurseschedule.repository;

import com.example.nurseschedule.entity.Nurse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NurseRepository extends JpaRepository<Nurse, Long> {
}
