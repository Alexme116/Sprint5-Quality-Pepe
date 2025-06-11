package com.springboot.MyTodoList.model;

import javax.persistence.*;

@Entity
@Table(name = "TEAMS")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TEAM_ID")
    private Integer id;

    @Column(name = "TEAM_NAME")
    private String name;

    @Column(name = "TEAM_SIZE")
    private Integer size;

    @Column(name = "MANAGER")
    private Integer manager;

    // Default constructor
    public Team() {
    }

    // Full constructor
    public Team(Integer id, String name, Integer size, Integer manager) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.manager = manager;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Integer getManager() {
        return manager;
    }

    public void setManager(Integer manager) {
        this.manager = manager;
    }

    @Override
    public String toString() {
        return "Team{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", size=" + size +
                ", manager=" + manager +
                '}';
    }
}