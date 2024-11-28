package com.example.nurseschedule;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class DataSourceTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    public void testDataSource() {
        Integer result = jdbcTemplate.queryForObject("SELECT 1;", Integer.class);
        assertThat(result).isEqualTo(1);
    }
}