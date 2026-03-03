package com.specguard.common.util;

import java.util.UUID;

public final class UUIDUtil {

    private UUIDUtil() throws IllegalAccessException {
        throw new IllegalAccessException("singleton class!");
    }

    /**
     * 生成uuid
     *
     * @return UUID （不带横线）
     */
    public static String generateUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }

}
