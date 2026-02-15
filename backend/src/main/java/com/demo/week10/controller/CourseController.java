package com.demo.week10.controller;

import com.demo.week10.model.Course;
import com.demo.week10.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private final CourseService service;

    public CourseController(CourseService service){
        this.service = service;
    }

    @GetMapping
    public List<Course> all(){
        return service.getAll();
    }

    @PostMapping
    public Course add(@RequestBody Course c){
        return service.save(c);
    }
}