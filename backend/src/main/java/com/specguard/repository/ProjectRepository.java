package com.specguard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.specguard.common.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}
