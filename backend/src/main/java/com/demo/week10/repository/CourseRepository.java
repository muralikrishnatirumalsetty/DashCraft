package com.demo.week10.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.demo.week10.model.Course;

public interface CourseRepository extends JpaRepository<Course,Long> {
}
