package com.specguard.entity;

import javax.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @ManyToMany
    @JoinTable(name = "project_spec_sets", joinColumns = @JoinColumn(name = "project_id"), inverseJoinColumns = @JoinColumn(name = "spec_set_id"))
    private List<SpecSet> specSets;
}
