package com.demo.week10.repository;

import com.demo.week10.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByName(String name);

    List<Student> findByMarksGreaterThan(int marks);
}
