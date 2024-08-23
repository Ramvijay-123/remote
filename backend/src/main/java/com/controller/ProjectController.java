package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.entity.Project;
import com.service.ProjectService;

import java.util.List;

@RestController
@CrossOrigin(origins = "https://remote-theta.vercel.app/")
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;
       
    @PostMapping("/create")
    public Project createProject(@RequestBody Project project) {
        return projectService.saveProject(project);
    }

    @GetMapping("/manager/{managerId}")
    public List<Project> getProjectsByManager(@PathVariable int managerId) {
        return projectService.findByManagerId(managerId);
    }

    // New endpoint for searching projects by name
    @GetMapping("/search")
    public List<Project> searchProjects(@RequestParam String name) {
        return projectService.searchProjectsByName(name);
    }
}
