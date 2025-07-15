package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class StudySpot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double latitude;
    private double longitude;
    private double rating;
    private double wifiStrength;

    public StudySpot() {}

    public StudySpot(String name, double latitude,double longitude, double rating, double wifiStrength) {
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
        this.rating = rating;
        this.wifiStrength = wifiStrength;
    }

    public double averageLongitude(double longitude, double otherLongitude) {
        return (this.longitude + otherLongitude) / 2;
    }

    public double averageLatitude(double latitude, double otherLatitude) {
        return (this.latitude + otherLatitude) / 2;
    }
    
    public Long getId() {
        return this.id;
    }
    public String getName() {
        return this.name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public double getlongitude() {
        return this.longitude;
    }
    public void setlongitude(double longitude) {
        this.longitude = longitude;
    }
    public double getLatitude() {
        return this.latitude;
    }
    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }
    public double getRating() {
        return this.rating;
    }
    public void setRating(double rating) {
        this.rating = rating;
    }
    public double getWifiStrength() {
        return this.wifiStrength;
    }
    public void setWifiStrength(double wifiStrength) {
        this.wifiStrength = wifiStrength;
    }
}
