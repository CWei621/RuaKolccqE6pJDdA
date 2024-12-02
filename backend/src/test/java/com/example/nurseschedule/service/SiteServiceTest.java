package com.example.nurseschedule.service;

import com.example.nurseschedule.entity.Site;
import com.example.nurseschedule.repository.SiteRepository;
import com.example.nurseschedule.service.impl.SiteServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class SiteServiceTest {

    private final SiteRepository siteRepository = Mockito.mock(SiteRepository.class);
    private final SiteService siteService = new SiteServiceImpl(siteRepository);

    @Test
    void testCreateSite() {
        Site site = new Site();
        site.setName("Emergency Ward");

        when(siteRepository.save(site)).thenReturn(site);

        Site createdSite = siteService.createSite(site);
        assertEquals("Emergency Ward", createdSite.getName());
    }

    @Test
    void testGetSiteById() {
        Site site = new Site();
        site.setId(1L);
        site.setName("Emergency Ward");

        when(siteRepository.findById(1L)).thenReturn(Optional.of(site));

        Site foundSite = siteService.getSiteById(1L);
        assertEquals("Emergency Ward", foundSite.getName());
    }

    @Test
    void testDeleteSite() {
        siteService.deleteSite(1L);
        verify(siteRepository, times(1)).deleteById(1L);
    }
}
