package com.controller;
import com.entity.Task;
import com.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "https://remote-theta.vercel.app")
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @PostMapping("/assign")
    public Task assignTask(@RequestBody Task task) {
        return taskService.saveTask(task);
    }

    @GetMapping("/user/{userId}")
    public List<Task> getTasksByUser(@PathVariable int userId) {
        return taskService.findByUserId(userId);
    }
    @GetMapping("/project/{projectId}")
    public List<Task> getTasksByProject(@PathVariable int projectId) {
        return taskService.findByProjectId(projectId);
    }
}

