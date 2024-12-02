package com.example.nurseschedule.service;

import com.example.nurseschedule.entity.Nurse;
import java.util.List;

public interface NurseService {
    List<Nurse> getAllNurses();
    Nurse getNurseById(Long id);
    Nurse createNurse(Nurse nurse);
    Nurse updateNurse(Long id, Nurse nurse);
    void deleteNurse(Long id);
}
