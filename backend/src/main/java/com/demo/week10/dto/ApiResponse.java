package com.demo.week10.dto;

public record ApiResponse<T>(
        boolean success,
        String message,
        T data
) {}
