package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class KeepAliveService {
    private final String URL = "https://remote-x5km.onrender.com/auth/searchUsers"; 
    @Autowired
    private RestTemplate restTemplate;

    @Scheduled(fixedRate =1000)  
    public void pingMyApp() {
        try {
            String response = restTemplate.getForObject(URL, String.class); 
            System.out.println("System is alive");  
        } catch (Exception e) {
            System.out.println("Error connecting to the backend: ");
        }
    }
}
