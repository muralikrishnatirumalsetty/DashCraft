package com.demo.week10.service;

import com.demo.week10.model.Student;
import com.demo.week10.repository.StudentRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)   // 🔥 MAGIC LINE (enables @Mock)
class StudentServiceTest {

    // ---------- AUTO MOCK ----------
    @Mock
    private StudentRepository repo;

    // ---------- AUTO INJECT ----------
    @InjectMocks
    private StudentService service;

    // =================================================
    // DAY 4 TASK TESTS
    // =================================================

    // ✅ getAll()
    @Test
    void shouldReturnAllStudents() {

        List<Student> fake = List.of(new Student(), new Student());

        when(repo.findAll()).thenReturn(fake);

        List<Student> result = service.getAll();

        assertEquals(2, result.size());
        verify(repo).findAll();
    }

    // ✅ save()
    @Test
    void shouldSaveStudent() {

        Student s = new Student();

        when(repo.save(s)).thenReturn(s);

        Student result = service.save(s);

        assertNotNull(result);
        verify(repo).save(s);
    }

    // ✅ delete()
    @Test
    void shouldDeleteStudent() {

        service.delete(1L);

        verify(repo).deleteById(1L);
    }

    // ✅ byName()
    @Test
    void shouldReturnStudentsByName() {

        List<Student> fake = List.of(new Student());

        when(repo.findByName("Murali")).thenReturn(fake);

        List<Student> result = service.byName("Murali");

        assertEquals(1, result.size());
        verify(repo).findByName("Murali");
    }

    // ✅ byMarks()
    @Test
    void shouldReturnStudentsByMarks() {

        List<Student> fake = List.of(new Student());

        when(repo.findByMarksGreaterThan(50)).thenReturn(fake);

        List<Student> result = service.byMarks(50);

        assertEquals(1, result.size());
        verify(repo).findByMarksGreaterThan(50);
    }
}
