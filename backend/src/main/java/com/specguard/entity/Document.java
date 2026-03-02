package com.specguard.entity;

import javax.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String filename;

    @Column(columnDefinition = "TEXT")
    private String rawContent;

    private LocalDateTime uploadTime;

    @ManyToOne
    @JoinColumn(name = "spec_set_id")
    private SpecSet specSet;

    @PrePersist
    protected void onCreate() {
        uploadTime = LocalDateTime.now();
    }
}
