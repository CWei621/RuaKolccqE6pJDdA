package com.example.nurseschedule.service.impl;

import com.example.nurseschedule.entity.Site;
import com.example.nurseschedule.repository.SiteRepository;
import com.example.nurseschedule.service.SiteService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SiteServiceImpl implements SiteService {

    private final SiteRepository siteRepository;

    public SiteServiceImpl(SiteRepository siteRepository) {
        this.siteRepository = siteRepository;
    }

    @Override
    public List<Site> getAllSites() {
        return siteRepository.findAll();
    }

    @Override
    public Site getSiteById(Long id) {
        return siteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Site not found with id: " + id));
    }

    @Override
    public Site createSite(Site site) {
        return siteRepository.save(site);
    }

    @Override
    public Site updateSite(Long id, Site site) {
        Site existingSite = getSiteById(id);
        existingSite.setName(site.getName());
        return siteRepository.save(existingSite);
    }

    @Override
    public void deleteSite(Long id) {
        siteRepository.deleteById(id);
    }
}
