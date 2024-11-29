package com.example.nurseschedule.controller;

import com.example.nurseschedule.entity.Nurse;
import com.example.nurseschedule.repository.NurseRepository;
import com.example.nurseschedule.repository.SiteNurseAssignmentRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class NurseControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private NurseRepository nurseRepository;

    @Autowired
    private SiteNurseAssignmentRepository siteNurseAssignmentRepository;

    @AfterEach
    void tearDown() {
        siteNurseAssignmentRepository.deleteAll();
        nurseRepository.deleteAll();
    }

    @Test
    void testGetAllNurses() throws Exception {
        Nurse nurse = new Nurse();
        nurse.setName("Jane Doe");
        nurse.setEmployeeId("N123");
        nurseRepository.save(nurse);

        mockMvc.perform(get("/api/nurses"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.data[0].name").value("Jane Doe"));
    }

    @Test
    void testCreateNurse() throws Exception {
        String nurseJson = """
                {
                    "name": "John Smith",
                    "employeeId": "N124"
                }
                """;

        mockMvc.perform(post("/api/nurses")
                        .contentType("application/json")
                        .content(nurseJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.data[0].name").value("John Smith"));
    }

    @Test
    void testUpdateNurse() throws Exception {
        Nurse nurse = new Nurse();
        nurse.setName("Jane Doe");
        nurse.setEmployeeId("N123");
        nurse = nurseRepository.save(nurse);

        String updatedNurseJson = """
                {
                    "name": "Jane Smith",
                    "employeeId": "N123"
                }
                """;

        mockMvc.perform(put("/api/nurses/" + nurse.getId())
                        .contentType("application/json")
                        .content(updatedNurseJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.data[0].name").value("Jane Smith"));
    }

    @Test
    void testDeleteNurse() throws Exception {
        Nurse nurse = new Nurse();
        nurse.setName("Jane Doe");
        nurse.setEmployeeId("N123");
        nurse = nurseRepository.save(nurse);

        mockMvc.perform(delete("/api/nurses/" + nurse.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.data[0]").value("刪除成功"));
    }
}