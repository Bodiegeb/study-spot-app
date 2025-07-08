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
            repository.save(new StudySpot("Marriott Library", 40.76259974563067, -111.84615814162471, 4.5, 4.3));
            repository.save(new StudySpot("Union Building", 40.765022635471816, -111.84613557797536,  3.8, 2.5));
            repository.save(new StudySpot("Field", 40.764858695837184, -111.83394714415668,  4.7, 9.4));
            repository.save(new StudySpot("Subway", 40.76450786986249, -111.85350243638295,  5.0, 8.3));
        }
    }
}