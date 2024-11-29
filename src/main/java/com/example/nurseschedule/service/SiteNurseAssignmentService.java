package com.example.nurseschedule.service;

import com.example.nurseschedule.entity.SiteNurseAssignment;
import com.example.nurseschedule.entity.Nurse;
import com.example.nurseschedule.entity.Site;
import java.util.List;
import java.util.Map;

public interface SiteNurseAssignmentService {
    void assignNurseToSite(Long siteId, Long nurseId);
    void removeNurseFromSite(Long siteId, Long nurseId);
    List<Nurse> getNursesBySite(Long siteId);
    List<Site> getSitesByNurse(Long nurseId);
    Map<String, List<Nurse>> getAllSitesWithNurses(); // 新增的方法

}
