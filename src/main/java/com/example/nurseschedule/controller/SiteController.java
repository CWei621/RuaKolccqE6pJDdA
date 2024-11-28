package com.example.nurseschedule.controller;

import com.example.nurseschedule.dto.ResponseWrapper;
import com.example.nurseschedule.entity.Site;
import com.example.nurseschedule.service.SiteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sites")
public class SiteController {

    private final SiteService siteService;

    public SiteController(SiteService siteService) {
        this.siteService = siteService;
    }

    @GetMapping
    public ResponseWrapper<Site> getAllSites() {
        List<Site> sites = siteService.getAllSites();
        return ResponseWrapper.ok(sites);
    }

    @PostMapping
    public ResponseWrapper<Site> createSite(@RequestBody Site site) {
        Site newSite = siteService.createSite(site);
        return ResponseWrapper.ok(List.of(newSite));
    }

    @PutMapping("/{id}")
    public ResponseWrapper<Site> updateSite(@PathVariable Long id, @RequestBody Site site) {
        Site updatedSite = siteService.updateSite(id, site);
        return ResponseWrapper.ok(List.of(updatedSite));
    }

    @DeleteMapping("/{id}")
    public ResponseWrapper<String> deleteSite(@PathVariable Long id) {
        siteService.deleteSite(id);
        return ResponseWrapper.ok(List.of("Site deleted successfully"));
    }
}
