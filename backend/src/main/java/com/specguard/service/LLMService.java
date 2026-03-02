package com.specguard.service;

import reactor.core.publisher.Flux;

public interface LLMService {
    /**
     * 同步获取 AI 回复
     */
    String complete(String prompt);

    /**
     * 流式获取 AI 回复
     */
    Flux<String> streamComplete(String prompt);
}
