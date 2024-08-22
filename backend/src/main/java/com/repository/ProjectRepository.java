package com.repository;
import com.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    List<Project> findByManagerId(int managerId);
    List<Project> findByNameContainingIgnoreCase(String name);
   }

