package com.demo.week10.controller;

import com.demo.week10.dto.ApiResponse;
import com.demo.week10.dto.StudentDTO;
import com.demo.week10.model.Student;
import com.demo.week10.service.StudentService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service){
        this.service = service;
    }


    // ✅ GET ALL
    @GetMapping
    public ResponseEntity<ApiResponse<Page<StudentDTO>>> getAll(
            @RequestParam(defaultValue="0") int page,
            @RequestParam(defaultValue="5") int size) {

        Page<StudentDTO> data = service.getAll(page, size);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Students fetched successfully", data)
        );
    }


    // ✅ ADD
    @PostMapping
    public ResponseEntity<ApiResponse<StudentDTO>> add(@RequestBody Student s){

        StudentDTO saved = service.save(s);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Student added successfully", saved)
        );
    }

    @PutMapping("/{id}")
    public StudentDTO update(
            @PathVariable long id,
            @RequestBody Student s) {

        return service.update(id, s);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {

        service.delete(id);
    }

}
