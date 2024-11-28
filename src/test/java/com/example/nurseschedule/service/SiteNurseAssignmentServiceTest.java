package com.example.nurseschedule.service;

import com.example.nurseschedule.entity.Nurse;
import com.example.nurseschedule.entity.Site;
import com.example.nurseschedule.entity.SiteNurseAssignment;
import com.example.nurseschedule.repository.SiteNurseAssignmentRepository;
import com.example.nurseschedule.repository.SiteRepository;
import com.example.nurseschedule.repository.NurseRepository;
import com.example.nurseschedule.service.impl.SiteNurseAssignmentServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.mockito.Mockito.*;

@SpringBootTest
class SiteNurseAssignmentServiceTest {

    private final SiteRepository siteRepository = Mockito.mock(SiteRepository.class);
    private final NurseRepository nurseRepository = Mockito.mock(NurseRepository.class);
    private final SiteNurseAssignmentRepository assignmentRepository = Mockito.mock(SiteNurseAssignmentRepository.class);
    private final SiteNurseAssignmentService assignmentService = new SiteNurseAssignmentServiceImpl(siteRepository, nurseRepository, assignmentRepository);

    @Test
    void testAssignNurseToSite() {
        Site site = new Site();
        site.setId(1L);

        Nurse nurse = new Nurse();
        nurse.setId(1L);

        when(siteRepository.findById(1L)).thenReturn(Optional.of(site));
        when(nurseRepository.findById(1L)).thenReturn(Optional.of(nurse));

        assignmentService.assignNurseToSite(1L, 1L);

        verify(assignmentRepository, times(1)).save(any(SiteNurseAssignment.class));
    }
}
