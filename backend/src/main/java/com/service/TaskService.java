package com.service;
import com.entity.Task;
import com.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> findByUserId(int userId) {
        return taskRepository.findByUserId(userId);
    }

    public List<Task> findByProjectId(int projectId) {
        return taskRepository.findByProjectId(projectId);
    }
}

