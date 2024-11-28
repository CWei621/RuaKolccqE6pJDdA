package com.example.nurseschedule.controller;

import com.example.nurseschedule.entity.Site;
import com.example.nurseschedule.repository.SiteRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class SiteControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private SiteRepository siteRepository;

    @AfterEach
    void tearDown() {
        siteRepository.deleteAll();
    }

    @Test
    void testGetAllSites() throws Exception {
        Site site = new Site();
        site.setName("Emergency Ward");
        siteRepository.save(site);

        mockMvc.perform(get("/api/sites"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.data[0].name").value("Emergency Ward"));
    }

    @Test
    void testCreateSite() throws Exception {
        String siteJson = """
                {
                    "name": "Emergency Ward"
                }
                """;

        mockMvc.perform(post("/api/sites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(siteJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.data[0].name").value("Emergency Ward"));
    }

    @Test
    void testUpdateSite() throws Exception {
        Site site = new Site();
        site.setName("Old Ward");
        siteRepository.save(site);

        String updatedSiteJson = """
                {
                    "name": "Updated Ward"
                }
                """;

        mockMvc.perform(put("/api/sites/" + site.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedSiteJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.data[0].name").value("Updated Ward"));
    }

    @Test
    void testDeleteSite() throws Exception {
        Site site = new Site();
        site.setName("Emergency Ward");
        siteRepository.save(site);

        mockMvc.perform(delete("/api/sites/" + site.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.data[0]").value("Site deleted successfully"));
    }
}