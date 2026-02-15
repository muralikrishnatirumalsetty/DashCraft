package com.demo.week10.service;

import com.demo.week10.dto.StudentDTO;
import com.demo.week10.model.Student;
import com.demo.week10.repository.StudentRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class StudentService {

    private final StudentRepository repo;

    public StudentService(StudentRepository repo){
        this.repo = repo;
    }


    // ✅ PAGINATION
    public Page<StudentDTO> getAll(int page, int size){

        log.info("Fetching students | page={} size={}", page, size);

        return repo.findAll(PageRequest.of(page,size))
                .map(this::toDTO);
    }


    // ✅ SAVE
    public StudentDTO save(Student s){

        log.info("Adding student: {}", s.getName());

        return toDTO(repo.save(s));
    }


    // ✅ MAPPER (clean conversion)
    private StudentDTO toDTO(Student s){

        return new StudentDTO(
                s.getId(),
                s.getName(),
                s.getMarks()
        );
    }

    public StudentDTO update(long id, Student s){
        s.setId(id);
        return toDTO(repo.save(s));
    }

    public void delete(long id){
        repo.deleteById(id);
    }

}
