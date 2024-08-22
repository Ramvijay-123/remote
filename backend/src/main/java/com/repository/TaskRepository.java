package com.repository;
import com.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByUserId(int userId);
    List<Task> findByProjectId(int projectId);
}
