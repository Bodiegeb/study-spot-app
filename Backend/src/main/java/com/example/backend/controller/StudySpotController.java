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

    // === GET spot by ID and average coordinates ===
    @GetMapping("/average/{id1}/{id2}")
    public double[] getAverageCoordinates(@PathVariable Long id1, @PathVariable Long id2) {
        StudySpot s1 = repository.findById(id1).orElseThrow();
        StudySpot s2 = repository.findById(id2).orElseThrow();
        
        double avgLat = s1.averageLatitude(s2.getLatitude());
        double avgLon = s1.averageLongitude(s2.getlongitude());
        
        return new double[] { avgLat, avgLon };
    }
    // === GET average rating ===
    @GetMapping("/average/rating/{id1}/{rating}")
    public double getAverageRating(@PathVariable Long id1, @PathVariable double newRating) {
        StudySpot spot = repository.findById(id1).orElseThrow();
        spot.averageRating(newRating);
        repository.save(spot);
        return spot.getRating();
    }
    // === GET average wifi strength ===
    @GetMapping("/average/wifi/{id1}/{wifiStrength}")
    public double getAverageWifiStrength(@PathVariable Long id1, @PathVariable double newWifiStrength) {
        StudySpot spot = repository.findById(id1).orElseThrow();
        spot.averageWifiStrength(newWifiStrength);
        repository.save(spot);
        return spot.getWifiStrength();
    }
}