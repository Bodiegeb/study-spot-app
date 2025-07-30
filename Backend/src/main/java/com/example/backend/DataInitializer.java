package com.example.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.backend.model.StudySpot;
import com.example.backend.repository.StudySpotRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final StudySpotRepository repository;

    public DataInitializer(StudySpotRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Will insert if the database is empty
        if (repository.count() == 0) {
            repository.save(new StudySpot("Marriott Library", 40.76259974563067, -111.84615814162471, 4.5, 4.3, 3.5));
        }
    }
}