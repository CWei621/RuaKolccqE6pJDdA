package com.example.nurseschedule.controller;

import com.example.nurseschedule.dto.ResponseWrapper;
import com.example.nurseschedule.entity.Site;
import com.example.nurseschedule.exception.ForeignKeyConstraintException;
import com.example.nurseschedule.service.SiteService;
import org.springframework.dao.DataIntegrityViolationException;
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
        try {
            siteService.deleteSite(id);
            return ResponseWrapper.ok(List.of("刪除成功"));
        } catch (DataIntegrityViolationException e) {
            if (e.getCause() instanceof org.hibernate.exception.ConstraintViolationException) {
                throw new ForeignKeyConstraintException("仍有護士在此站點，請先移除護士");
            }
            throw e;
        }
    }
}
