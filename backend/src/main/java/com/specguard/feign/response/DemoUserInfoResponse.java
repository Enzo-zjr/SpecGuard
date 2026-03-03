package com.specguard.feign.response;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * xxx-接口响应参数
 *
 * @author Qi Ning
 */
@Data
public class DemoUserInfoResponse {

    private Integer code;

    /** 异常信息，非200状态码错误描述 */
    private String message;

    /** 数据 */
    private ResponseData data;

    /**
     * xxx数据
     */
    @Data
    @AllArgsConstructor
    public static class ResponseData {

        private Long userId;

        private String userName;

    }

}
