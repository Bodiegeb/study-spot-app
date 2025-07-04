package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.StudySpot;

public interface StudySpotRepository extends JpaRepository<StudySpot, Long> {
}