package com.specguard.common.util;

import java.util.UUID;

/**
 * UUIDHelper
 */
public final class UUIDHelper {

    private UUIDHelper() {
    }

    /**
     * 生成uuid
     *
     * @return uuid
     */
    public static String getUuid() {
        return getUuid(false);
    }

    /**
     * 生成uuid
     *
     * @param upperCase 是否大写
     * @return uuid
     */
    public static String getUuid(boolean upperCase) {
        String uuid = UUID.randomUUID().toString().replace("-", "");
        return upperCase ? uuid.toUpperCase() : uuid;
    }

}
