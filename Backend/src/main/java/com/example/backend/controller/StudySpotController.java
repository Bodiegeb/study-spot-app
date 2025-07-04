package com.example.backend.controller;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.StudySpot;
import com.example.backend.repository.StudySpotRepository;

@RestController
@RequestMapping("/spots")
@CrossOrigin(origins = "*") // Allow all origins for CORS
public class StudySpotController {

    private final StudySpotRepository repository;

    public StudySpotController(StudySpotRepository repository) {
        this.repository = repository;
    }

    // === GET all spots ===
    @GetMapping
    public List<StudySpot> getAllSpots() {
        return repository.findAll();
    }

    // === POST new spot ===
    @PostMapping
    public StudySpot addSpot(@RequestBody StudySpot spot) {
        return repository.save(spot);
    }

    // === DELETE spot by ID ===
    @DeleteMapping("/delete/{id}")
    public void deleteSpot(@PathVariable Long id) {
        repository.deleteById(id);
    }
}