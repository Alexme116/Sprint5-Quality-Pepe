package com.springboot.MyTodoList.model;

import javax.persistence.*;

@Entity
@Table(name = "STATUS")
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "STATUS_BODY")
    private String statusBody;

    // Default constructor
    public Status() {
    }

    // Full constructor
    public Status(Integer id, String statusBody) {
        this.id = id;
        this.statusBody = statusBody;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStatusBody() {
        return statusBody;
    }

    public void setStatusBody(String statusBody) {
        this.statusBody = statusBody;
    }

    @Override
    public String toString() {
        return "Status{" +
                "id=" + id +
                ", statusBody='" + statusBody + '\'' +
                '}';
    }
}