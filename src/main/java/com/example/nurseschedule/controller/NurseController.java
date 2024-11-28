package com.example.nurseschedule.controller;

import com.example.nurseschedule.dto.ResponseWrapper;
import com.example.nurseschedule.entity.Nurse;
import com.example.nurseschedule.service.NurseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nurses")
public class NurseController {

    private final NurseService nurseService;

    public NurseController(NurseService nurseService) {
        this.nurseService = nurseService;
    }

    @GetMapping
    public ResponseWrapper<Nurse> getAllNurses() {
        List<Nurse> nurses = nurseService.getAllNurses();
        return ResponseWrapper.ok(nurses);
    }

    @PostMapping
    public ResponseWrapper<Nurse> createNurse(@RequestBody Nurse nurse) {
        Nurse newNurse = nurseService.createNurse(nurse);
        return ResponseWrapper.ok(List.of(newNurse));
    }

    @PutMapping("/{id}")
    public ResponseWrapper<Nurse> updateNurse(@PathVariable Long id, @RequestBody Nurse nurse) {
        Nurse updatedNurse = nurseService.updateNurse(id, nurse);
        return ResponseWrapper.ok(List.of(updatedNurse));
    }

    @DeleteMapping("/{id}")
    public ResponseWrapper<String> deleteNurse(@PathVariable Long id) {
        nurseService.deleteNurse(id);
        return ResponseWrapper.ok(List.of("Nurse deleted successfully"));
    }
}
