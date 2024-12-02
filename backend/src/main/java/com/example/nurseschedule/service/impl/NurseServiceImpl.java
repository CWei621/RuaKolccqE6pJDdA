package com.example.nurseschedule.service.impl;

import com.example.nurseschedule.entity.Nurse;
import com.example.nurseschedule.repository.NurseRepository;
import com.example.nurseschedule.service.NurseService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NurseServiceImpl implements NurseService {

    private final NurseRepository nurseRepository;

    public NurseServiceImpl(NurseRepository nurseRepository) {
        this.nurseRepository = nurseRepository;
    }

    @Override
    public List<Nurse> getAllNurses() {
        return nurseRepository.findAll();
    }

    @Override
    public Nurse getNurseById(Long id) {
        return nurseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nurse not found with id: " + id));
    }

    @Override
    public Nurse createNurse(Nurse nurse) {
        return nurseRepository.save(nurse);
    }

    @Override
    public Nurse updateNurse(Long id, Nurse nurse) {
        Nurse existingNurse = getNurseById(id);
        existingNurse.setName(nurse.getName());
        existingNurse.setEmployeeId(nurse.getEmployeeId());
        return nurseRepository.save(existingNurse);
    }

    @Override
    public void deleteNurse(Long id) {
        nurseRepository.deleteById(id);
    }
}
