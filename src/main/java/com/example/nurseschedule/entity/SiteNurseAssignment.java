package com.example.nurseschedule.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "site_nurse_assignment")
public class SiteNurseAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "site_id", nullable = false)
    private Site site;

    @ManyToOne
    @JoinColumn(name = "nurse_id", nullable = false)
    private Nurse nurse;

    @Column(nullable = false)
    private LocalDateTime assignedAt;

    @PrePersist
    protected void onAssign() {
        this.assignedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Site getSite() {
        return site;
    }

    public void setSite(Site site) {
        this.site = site;
    }

    public Nurse getNurse() {
        return nurse;
    }

    public void setNurse(Nurse nurse) {
        this.nurse = nurse;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }
}
