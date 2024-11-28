package com.example.nurseschedule.repository;

import com.example.nurseschedule.entity.SiteNurseAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.nurseschedule.entity.Nurse;
import com.example.nurseschedule.entity.Site;
import java.util.Optional;
import java.util.List;

public interface SiteNurseAssignmentRepository extends JpaRepository<SiteNurseAssignment, Long> {
    Optional<SiteNurseAssignment> findBySiteIdAndNurseId(Long siteId, Long nurseId);
    List<SiteNurseAssignment> findBySite(Site site);
    List<SiteNurseAssignment> findByNurse(Nurse nurse);

}
