package com.example.nurseschedule.service;

import com.example.nurseschedule.entity.Nurse;
import com.example.nurseschedule.repository.NurseRepository;
import com.example.nurseschedule.service.impl.NurseServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class NurseServiceTest {

    private final NurseRepository nurseRepository = Mockito.mock(NurseRepository.class);
    private final NurseService nurseService = new NurseServiceImpl(nurseRepository);

    @Test
    void testCreateNurse() {
        Nurse nurse = new Nurse();
        nurse.setName("Jane Doe");
        nurse.setEmployeeId("N123");

        when(nurseRepository.save(nurse)).thenReturn(nurse);

        Nurse createdNurse = nurseService.createNurse(nurse);
        assertEquals("Jane Doe", createdNurse.getName());
        assertEquals("N123", createdNurse.getEmployeeId());
    }

    @Test
    void testGetNurseById() {
        Nurse nurse = new Nurse();
        nurse.setId(1L);
        nurse.setName("Jane Doe");

        when(nurseRepository.findById(1L)).thenReturn(Optional.of(nurse));

        Nurse foundNurse = nurseService.getNurseById(1L);
        assertEquals("Jane Doe", foundNurse.getName());
    }

    @Test
    void testDeleteNurse() {
        nurseService.deleteNurse(1L);
        verify(nurseRepository, times(1)).deleteById(1L);
    }
}
