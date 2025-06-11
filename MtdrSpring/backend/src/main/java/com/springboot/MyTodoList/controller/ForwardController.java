package com.springboot.MyTodoList.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ForwardController {

    @GetMapping({"/", "/displays", "/displays/dashboard", "/displays/report"})
    public String forwardRoutes() {
        return "forward:/index.html";
    }
}