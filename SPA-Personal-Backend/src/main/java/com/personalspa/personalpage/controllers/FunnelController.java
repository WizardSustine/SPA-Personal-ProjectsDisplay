package com.personalspa.personalpage.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personalspa.personalpage.entities.Funnel;
import com.personalspa.personalpage.services.FunnelService;

@RestController
@RequestMapping("/funnel")
public class FunnelController {

    @Autowired
    private FunnelService funnelService;

     @PostMapping("/delete/{id}")
    public void deleteFunnel(@PathVariable String id) {
        funnelService.deleteById(id);
    }

    @GetMapping("/all")
    public List<Funnel> getAllFunnel() {
        return funnelService.findAll();
    }

    @PostMapping("/save")
    public Funnel saveFunnel(@RequestBody Funnel funnel) {
        return funnelService.save(funnel);
    }

    @GetMapping("/{id}")
    public Optional<Funnel> getFunnelById(@PathVariable String id) {
        return funnelService.findById(id);
    }

}
