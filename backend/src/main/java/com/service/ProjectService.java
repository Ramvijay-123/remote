package com.service;
import com.entity.Project;
import com.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> findByManagerId(int managerId) {
        return projectRepository.findByManagerId(managerId);
    }
    public List<Project> searchProjectsByName(String name) {
        return projectRepository.findByNameContainingIgnoreCase(name);
    }
}
