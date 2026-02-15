package com.demo.week10.service;

import com.demo.week10.model.Course;
import com.demo.week10.repository.CourseRepository;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CourseService {

    private final CourseRepository repo;

    public CourseService(CourseRepository repo){
        this.repo = repo;
    }

    public List<Course> getAll(){
        return repo.findAll();
    }

    public Course save(Course c){
        return repo.save(c);
    }
}