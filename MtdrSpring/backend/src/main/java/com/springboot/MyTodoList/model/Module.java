package com.springboot.MyTodoList.model;

import javax.persistence.*;


import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "MODULES")
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MODULE_ID")
    private Integer id;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "BODY")
    private String body;

    @Column(name = "CATEGORY_ID")
    private Integer categoryId;

    @Column(name = "STATUS")
    private Integer status;

    @Column(name = "SEVERITY")
    private Integer severity;

    @Column(name = "START_DATE")
    private LocalDate startDate;

    @Column(name = "DATE_LIMIT")
    private LocalDate dateLimit;

    @Column(name = "PARENT_MODULE")
    private Integer parentModule;


     @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "MODULE_ID", referencedColumnName = "MODULE_ID", insertable = false, updatable = false)
    @JsonManagedReference  // Add this annotation
    private Set<ToDoItem> tasks;

    // Default constructor
    public Module() {
    }

    // Full constructor matching all fields
    public Module(Integer id, String title, String body, Integer categoryId, Integer status, Integer severity, 
                  LocalDate startDate, LocalDate dateLimit, Integer parentModule) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.categoryId = categoryId;
        this.status = status;
        this.severity = severity;
        this.startDate = startDate;
        this.dateLimit = dateLimit;
        this.parentModule = parentModule;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getSeverity() {
        return severity;
    }

    public void setSeverity(Integer severity) {
        this.severity = severity;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getDateLimit() {
        return dateLimit;
    }

    public void setDateLimit(LocalDate dateLimit) {
        this.dateLimit = dateLimit;
    }

    public Integer getParentModule() {
        return parentModule;
    }

    public void setParentModule(Integer parentModule) {
        this.parentModule = parentModule;
    }

    public Set<ToDoItem> getTasks() {
        return tasks;
    }
    public void setTasks(Set<ToDoItem> tasks) {
        this.tasks = tasks;
    }

    @Override
    public String toString() {
        return "Module{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", body='" + body + '\'' +
                ", categoryId=" + categoryId +
                ", status=" + status +
                ", severity=" + severity +
                ", startDate=" + startDate +
                ", dateLimit=" + dateLimit +
                ", parentModule=" + parentModule +
                ", tasks=" + tasks +
                '}';
    }
}
