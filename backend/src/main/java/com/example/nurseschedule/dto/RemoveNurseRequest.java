package com.example.nurseschedule.dto;

public class RemoveNurseRequest {
    private Long siteId;
    private Long nurseId;

    // Getters and Setters
    public Long getSiteId() {
        return siteId;
    }

    public void setSiteId(Long siteId) {
        this.siteId = siteId;
    }

    public Long getNurseId() {
        return nurseId;
    }

    public void setNurseId(Long nurseId) {
        this.nurseId = nurseId;
    }
}