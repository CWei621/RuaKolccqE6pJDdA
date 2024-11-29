package com.example.nurseschedule.controller;

import com.example.nurseschedule.NurseScheduleApplication;
import com.example.nurseschedule.entity.Nurse;
import com.example.nurseschedule.entity.Site;
import com.example.nurseschedule.repository.NurseRepository;
import com.example.nurseschedule.repository.SiteRepository;
import com.example.nurseschedule.repository.SiteNurseAssignmentRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@ContextConfiguration(classes = NurseScheduleApplication.class)
class SiteNurseAssignmentControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private NurseRepository nurseRepository;

    @Autowired
    private SiteNurseAssignmentRepository siteNurseAssignmentRepository;

    @AfterEach
    void tearDown() {
        siteNurseAssignmentRepository.deleteAll();
        siteRepository.deleteAll();
        nurseRepository.deleteAll();
    }

    @Test
    @Rollback
    void testAssignNurseToSite() throws Exception {
        Site site = new Site();
        site.setName("Emergency Ward");
        site = siteRepository.save(site);

        Nurse nurse = new Nurse();
        nurse.setName("Jane Doe");
        nurse.setEmployeeId("N123");
        nurse = nurseRepository.save(nurse);

        String requestBody = """
            {
                "siteId": %d,
                "nurseId": %d
            }
            """.formatted(site.getId(), nurse.getId());

        mockMvc.perform(post("/api/assignments/assign")
                .contentType("application/json")
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.data[0]").value("Nurse assigned to site successfully"));
    }

    @Test
    @Rollback
    void testRemoveNurseFromSite() throws Exception {
        Site site = new Site();
        site.setName("Emergency Ward");
        site = siteRepository.save(site);

        Nurse nurse = new Nurse();
        nurse.setName("Jane Doe");
        nurse.setEmployeeId("N123");
        nurse = nurseRepository.save(nurse);

        mockMvc.perform(post("/api/assignments/assign")
            .contentType("application/json")
            .content("""
                {
                    "siteId": %d,
                    "nurseId": %d
                }
                """.formatted(site.getId(), nurse.getId())))
            .andExpect(status().isOk());

        mockMvc.perform(delete("/api/assignments/remove")
            .contentType("application/json")
            .content("""
                {
                    "siteId": %d,
                    "nurseId": %d
                }
                """.formatted(site.getId(), nurse.getId())))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.status").value("ok"))
            .andExpect(jsonPath("$.data[0]").value("Nurse removed from site successfully"));
    }

    @Test
    @Rollback
    void testGetNursesBySite() throws Exception {
        Site site = new Site();
        site.setName("Emergency Ward");
        site = siteRepository.save(site);

        Nurse nurse = new Nurse();
        nurse.setName("Jane Doe");
        nurse.setEmployeeId("N123");
        nurse = nurseRepository.save(nurse);

        mockMvc.perform(post("/api/assignments/assign")
            .contentType("application/json")
            .content("""
            {
                "siteId": %d,
                "nurseId": %d
            }
            """.formatted(site.getId(), nurse.getId())))
            .andExpect(status().isOk());

        mockMvc.perform(get("/api/assignments/site/" + site.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.data[0].name").value("Jane Doe"));
    }

    @Test
    @Rollback
    void testGetSitesByNurse() throws Exception {
        Site site = new Site();
        site.setName("Emergency Ward");
        site = siteRepository.save(site);

        Nurse nurse = new Nurse();
        nurse.setName("Jane Doe");
        nurse.setEmployeeId("N123");
        nurse = nurseRepository.save(nurse);

        mockMvc.perform(post("/api/assignments/assign")
            .contentType("application/json")
            .content("""
            {
                "siteId": %d,
                "nurseId": %d
            }
            """.formatted(site.getId(), nurse.getId())))
            .andExpect(status().isOk());

        mockMvc.perform(get("/api/assignments/nurse/" + nurse.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.data[0].name").value("Emergency Ward"));
    }
}