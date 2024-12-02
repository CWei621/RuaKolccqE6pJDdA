package com.example.nurseschedule.dto;

import java.util.Map;

public class MapResponseWrapper<K, V> {

    private String status;
    private Map<K, V> data;

    public MapResponseWrapper(String status, Map<K, V> data) {
        this.status = status;
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Map<K, V> getData() {
        return data;
    }

    public void setData(Map<K, V> data) {
        this.data = data;
    }

    public static <K, V> MapResponseWrapper<K, V> ok(Map<K, V> data) {
        return new MapResponseWrapper<>("ok", data);
    }

    public static <K, V> MapResponseWrapper<K, V> fail(String message) {
        return new MapResponseWrapper<>("fail", Map.of());
    }
}