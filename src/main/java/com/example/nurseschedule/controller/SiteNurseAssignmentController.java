package com.example.nurseschedule.controller;

import com.example.nurseschedule.dto.ResponseWrapper;
import com.example.nurseschedule.entity.Nurse;
import com.example.nurseschedule.entity.Site;
import com.example.nurseschedule.service.SiteNurseAssignmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class SiteNurseAssignmentController {

    private final SiteNurseAssignmentService assignmentService;

    public SiteNurseAssignmentController(SiteNurseAssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @PostMapping("/assign")
    public ResponseWrapper<String> assignNurseToSite(@RequestParam Long siteId, @RequestParam Long nurseId) {
        assignmentService.assignNurseToSite(siteId, nurseId);
        return ResponseWrapper.ok(List.of("Nurse assigned to site successfully"));
    }

    @DeleteMapping("/remove")
    public ResponseWrapper<String> removeNurseFromSite(@RequestParam Long siteId, @RequestParam Long nurseId) {
        assignmentService.removeNurseFromSite(siteId, nurseId);
        return ResponseWrapper.ok(List.of("Nurse removed from site successfully"));
    }

    @GetMapping("/site/{siteId}")
    public ResponseWrapper<Nurse> getNursesBySite(@PathVariable Long siteId) {
        List<Nurse> nurses = assignmentService.getNursesBySite(siteId);
        return ResponseWrapper.ok(nurses);
    }

    @GetMapping("/nurse/{nurseId}")
    public ResponseWrapper<Site> getSitesByNurse(@PathVariable Long nurseId) {
        List<Site> sites = assignmentService.getSitesByNurse(nurseId);
        return ResponseWrapper.ok(sites);
    }
}
