package com.springboot.MyTodoList.model;

import javax.persistence.*;

@Entity
@Table(name = "TEAMS_WORKING_MODULES")
public class TeamWorkingModule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "MODULE_ID")
    private Integer moduleId;

    @Column(name = "TEAM_ID")
    private Integer teamId;

    // Default constructor
    public TeamWorkingModule() {
    }

    // Full constructor
    public TeamWorkingModule(Integer id, Integer moduleId, Integer teamId) {
        this.id = id;
        this.moduleId = moduleId;
        this.teamId = teamId;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getModuleId() {
        return moduleId;
    }

    public void setModuleId(Integer moduleId) {
        this.moduleId = moduleId;
    }

    public Integer getTeamId() {
        return teamId;
    }

    public void setTeamId(Integer teamId) {
        this.teamId = teamId;
    }

    @Override
    public String toString() {
        return "TeamWorkingModule{" +
                "id=" + id +
                ", moduleId=" + moduleId +
                ", teamId=" + teamId +
                '}';
    }
}