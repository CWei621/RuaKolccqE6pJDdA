package com.example.nurseschedule.dto;

import java.util.List;

public class ResponseWrapper<T> {

    private String status;
    private List<T> data;

    public ResponseWrapper(String status, List<T> data) {
        this.status = status;
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public static <T> ResponseWrapper<T> ok(List<T> data) {
        return new ResponseWrapper<>("ok", data);
    }

    public static <T> ResponseWrapper<T> fail(String message) {
        return new ResponseWrapper<>("fail", List.of((T) message));
    }
}
