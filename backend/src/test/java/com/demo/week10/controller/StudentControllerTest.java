package com.demo.week10.controller;

import com.demo.week10.model.Student;
import com.demo.week10.service.StudentService;
import com.demo.week10.config.JwtFilter;
import com.demo.week10.config.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/*
 ✅ SIMPLE FIX
 Just mock security beans instead of excluding configs
*/
@WebMvcTest(StudentController.class)
@AutoConfigureMockMvc(addFilters = false)
class StudentControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper mapper;

    @MockBean
    StudentService service;

    // 🔥 ADD THESE TWO (VERY IMPORTANT)
    @MockBean
    JwtFilter jwtFilter;

    @MockBean
    JwtUtil jwtUtil;



    @Test
    void shouldReturnStudents() throws Exception {

        List<Student> fake = List.of(new Student(), new Student());
        when(service.getAll()).thenReturn(fake);

        mockMvc.perform(get("/students"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }



    @Test
    void shouldCreateStudent() throws Exception {

        Student s = new Student();
        s.setName("Murali");
        s.setMarks(95);

        when(service.save(any())).thenReturn(s);

        mockMvc.perform(post("/students")
                        .contentType("application/json")
                        .content(mapper.writeValueAsString(s)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Murali"));
    }

    @Test
    void shouldReturnBadRequestForInvalidData() throws Exception {

        Student s = new Student();
        s.setName(""); // invalid
        s.setMarks(-5); // invalid

        mockMvc.perform(post("/students")
                        .contentType("application/json")
                        .content(mapper.writeValueAsString(s)))
                .andExpect(status().isBadRequest());
    }

}
