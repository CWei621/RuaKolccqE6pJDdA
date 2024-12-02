package com.example.nurseschedule;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;

import javax.sql.DataSource;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.SQLException;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
public class DataSourceTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    public void testDataSource() {
        Integer result = jdbcTemplate.queryForObject("SELECT 1;", Integer.class);
        assertThat(result).isEqualTo(1);
    }

    @Test
    public void testDatabaseMetaData() throws SQLException {
        DataSource dataSource = jdbcTemplate.getDataSource();
        assertThat(dataSource).isNotNull();

        try (Connection connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            String databaseProductName = metaData.getDatabaseProductName();
            assertThat(databaseProductName).isEqualTo("PostgreSQL");
        }
    }
}