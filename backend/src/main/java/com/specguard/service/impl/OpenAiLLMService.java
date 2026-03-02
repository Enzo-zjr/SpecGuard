package com.specguard.service.impl;

import com.specguard.service.LLMService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.util.Map;
import java.util.HashMap;

@Service
public class OpenAiLLMService implements LLMService {

    private final WebClient webClient;

    @Value("${app.ai-service.url:http://localhost:8000}")
    private String aiServiceUrl;

    public OpenAiLLMService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    @Override
    public String complete(String prompt) {
        // 在新架构中，Java 直接调用 Python 的综合工作流
        java.util.Map<String, Object> body = new java.util.HashMap<>();
        body.put("code", prompt);
        body.put("project_id", 1); // 示例，实际应从上下文获取

        return webClient.post()
                .uri(aiServiceUrl + "/workflow/review")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(java.util.Map.class)
                .map(response -> (String) response.get("review_result"))
                .block();
    }

    @Override
    public Flux<String> streamComplete(String prompt) {
        return Flux.just(complete(prompt));
    }
}
