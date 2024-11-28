package com.example.nurseschedule.service.impl;

import com.example.nurseschedule.entity.Site;
import com.example.nurseschedule.entity.Nurse;
import com.example.nurseschedule.entity.SiteNurseAssignment;
import com.example.nurseschedule.repository.SiteNurseAssignmentRepository;
import com.example.nurseschedule.repository.SiteRepository;
import com.example.nurseschedule.repository.NurseRepository;
import com.example.nurseschedule.service.SiteNurseAssignmentService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SiteNurseAssignmentServiceImpl implements SiteNurseAssignmentService {

    private final SiteRepository siteRepository;
    private final NurseRepository nurseRepository;
    private final SiteNurseAssignmentRepository assignmentRepository;

    public SiteNurseAssignmentServiceImpl(SiteRepository siteRepository,
                                          NurseRepository nurseRepository,
                                          SiteNurseAssignmentRepository assignmentRepository) {
        this.siteRepository = siteRepository;
        this.nurseRepository = nurseRepository;
        this.assignmentRepository = assignmentRepository;
    }

    @Override
    public void assignNurseToSite(Long siteId, Long nurseId) {
        Site site = siteRepository.findById(siteId)
                .orElseThrow(() -> new RuntimeException("Site not found with id: " + siteId));
        Nurse nurse = nurseRepository.findById(nurseId)
                .orElseThrow(() -> new RuntimeException("Nurse not found with id: " + nurseId));

        SiteNurseAssignment assignment = new SiteNurseAssignment();
        assignment.setSite(site);
        assignment.setNurse(nurse);
        assignmentRepository.save(assignment);
    }

    @Override
    public void removeNurseFromSite(Long siteId, Long nurseId) {
        SiteNurseAssignment assignment = assignmentRepository
                .findBySiteIdAndNurseId(siteId, nurseId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        assignmentRepository.delete(assignment);
    }

    @Override
    public List<Nurse> getNursesBySite(Long siteId) {
        Site site = siteRepository.findById(siteId)
                .orElseThrow(() -> new RuntimeException("Site not found with id: " + siteId));
        return assignmentRepository.findBySite(site)
                .stream()
                .map(SiteNurseAssignment::getNurse)
                .toList();
    }

    @Override
    public List<Site> getSitesByNurse(Long nurseId) {
        Nurse nurse = nurseRepository.findById(nurseId)
                .orElseThrow(() -> new RuntimeException("Nurse not found with id: " + nurseId));
        return assignmentRepository.findByNurse(nurse)
                .stream()
                .map(SiteNurseAssignment::getSite)
                .toList();
    }
}
