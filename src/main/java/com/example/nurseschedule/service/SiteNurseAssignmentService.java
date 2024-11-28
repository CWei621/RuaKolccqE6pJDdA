package com.example.nurseschedule.service;

import com.example.nurseschedule.entity.SiteNurseAssignment;
import com.example.nurseschedule.entity.Nurse;
import com.example.nurseschedule.entity.Site;
import java.util.List;

public interface SiteNurseAssignmentService {
    void assignNurseToSite(Long siteId, Long nurseId);
    void removeNurseFromSite(Long siteId, Long nurseId);
    List<Nurse> getNursesBySite(Long siteId);
    List<Site> getSitesByNurse(Long nurseId);

}
