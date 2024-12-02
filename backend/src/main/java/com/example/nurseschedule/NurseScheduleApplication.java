package com.example.nurseschedule;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NurseScheduleApplication {

    public static void main(String[] args) {
        SpringApplication.run(NurseScheduleApplication.class, args);
        System.out.println("Hello, Nurse Schedule!");
    }

}
