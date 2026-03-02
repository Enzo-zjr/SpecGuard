package com.specguard.service;

import com.specguard.entity.ReviewReport;

public interface ReviewService {
    ReviewReport performReview(Long projectId, String codeSnippet);
}
