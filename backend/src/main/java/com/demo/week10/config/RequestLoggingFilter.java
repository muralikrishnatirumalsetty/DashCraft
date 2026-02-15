package com.demo.week10.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class RequestLoggingFilter implements Filter {

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;

        long start = System.currentTimeMillis();

        chain.doFilter(request, response);

        long time = System.currentTimeMillis() - start;

        log.info("{} {} -> {} ms",
                req.getMethod(),
                req.getRequestURI(),
                time);
    }
}
