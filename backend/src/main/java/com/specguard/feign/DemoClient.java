package com.specguard.feign;

import java.util.Arrays;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.specguard.feign.response.DemoUserInfoResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * 客户端,一般用户调用其他系统的接口
 *
 * @author
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DemoClient {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    /**
     * 发送post请求
     *
     * @return 响应
     */
    public DemoUserInfoResponse sendPost() {
        // 构建url与参数
        try {
            String url = "http://www.baidu.com";
            // 构建url与参数
            String uri = UriComponentsBuilder
                    .fromHttpUrl(url)
                    .queryParam("param1", "paramValueXXX")
                    .toUriString();
            // 请求体
            String requestBody = objectMapper.writeValueAsString(Arrays.asList("bodyItem1", "bodyItem2"));
            // 请求头
            MultiValueMap<String, String> headers = new HttpHeaders();
            headers.add("Content-Type", "application/x-www-form-urlencoded");
            headers.add("header1", "headerValueXXX");
            HttpEntity<Object> entity = new HttpEntity<>(requestBody, headers);
            log.info("调用xxx接口,请求url:[{}],请求体:[{}],请求头:[{}]", uri, entity, headers);

            ResponseEntity<String> exchange = restTemplate.exchange(uri, HttpMethod.POST, entity, String.class);
            log.info("调用xxx接口 响应信息:{}", exchange);
            HttpStatus statusCode = exchange.getStatusCode();
            if (!statusCode.is2xxSuccessful()) {
                log.error("调用xxx接口 失败!code值不是200,信息:{}", exchange);
                return null;
            }

            String body = exchange.getBody();
            DemoUserInfoResponse response = objectMapper.readValue(body, DemoUserInfoResponse.class);
            if (response != null && response.getCode() != null && response.getCode() != HttpStatus.OK.value()) {
                log.error("调用xxx接口 失败!响应中code值不是200,信息:{}", exchange);
                return null;
            }
            return response;

        } catch (Exception e) {
            log.error("调用xxx接口 失败!异常信息为:", e);
            return null;
        }

    }

}
