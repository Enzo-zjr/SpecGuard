package com.specguard.common.util;

import java.util.List;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeType;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public final class JSONUtil {

    public static final String MSG = "字符串转为对象出错，字符串信息为：{}";

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private JSONUtil() throws IllegalAccessException {
        throw new IllegalAccessException("singleton class!");
    }

    /**
     * 对象转字符串
     *
     * @param obj 对象
     * @return 字符串
     */
    public static String objectToString(Object obj) {
        try {
            return MAPPER.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            log.error("对象转字符串出错，对象信息为：{}", obj.toString());
            throw new IllegalArgumentException(e);
        }
    }

    /**
     * 字符串转对象
     *
     * @param str   字符串
     * @param clazz 类型
     * @param <T>   指定类型
     * @return 指定类型
     * @throws IllegalArgumentException 转换错误。
     */
    public static <T> T stringToObject(String str, Class<T> clazz) {
        try {
            return MAPPER.readValue(str, clazz);
        } catch (JsonProcessingException e) {
            log.error(MSG, str.replaceAll("[\r\n]", ""));
            throw new IllegalArgumentException(e);
        }
    }

    /**
     * 字符串转对象
     *
     * @param str   字符串
     * @param clazz 类型
     * @param <T>   指定类型
     * @return 指定类型
     * @throws IllegalArgumentException 转换错误。
     */
    public static <T> List<T> stringToList(String str, Class<T> clazz) {
        JavaType javaType = MAPPER.getTypeFactory().constructParametricType(List.class, clazz);
        try {
            return MAPPER.readValue(str, javaType);
        } catch (JsonProcessingException e) {
            log.error(MSG, str.replaceAll("[\r\n]", ""));
            throw new IllegalArgumentException(e);
        }
    }

    /**
     * 创建json节点
     *
     * @param type 节点类型
     * @return json节点
     */
    public static JsonNode createNode(JsonNodeType type) {
        switch (type) {
            case NULL:
                return MAPPER.getNodeFactory().nullNode();
            case ARRAY:
                return MAPPER.getNodeFactory().arrayNode();
            case OBJECT:
                return MAPPER.getNodeFactory().objectNode();
            default:
                throw new IllegalArgumentException(String.format("不支持的JsonNodeType:%s", type));
        }
    }

}
