package com.atlantbh.test.reporter.controllers;

import com.atlantbh.test.reporter.services.exceptions.ServiceException;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
public class CustomErrorController implements ErrorController {
    @RequestMapping(value = "/errorR", method = RequestMethod.GET)
    public ResponseEntity handleError() {
        return ResponseEntity.ok("");
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
}
