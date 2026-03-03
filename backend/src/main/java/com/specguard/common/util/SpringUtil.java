package com.specguard.common.util;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

/**
 * 获取spring注入对象方法
 */
@Component("springUtil")
public final class SpringUtil implements ApplicationContextAware {

    /**
     * 应用上下文
     */
    private static ApplicationContext applicationContext;

    /**
     * 获取注入对象
     *
     * @param name 对象名称
     * @return 指定注入对象
     */
    public static Object getBean(String name) {
        return getApplicationContext().getBean(name);
    }

    // 获取applicationContext
    private static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    @Override
    public void setApplicationContext(@NonNull ApplicationContext applicationContext) {
        synchronized (SpringUtil.class) {
            if (null == SpringUtil.applicationContext) {
                SpringUtil.applicationContext = applicationContext;
            }
        }
    }

    /**
     * 获取注入对象
     *
     * @param clazz 对象类型
     * @param <T>   泛型
     * @return 指定注入对象
     */
    public static <T> T getBean(Class<T> clazz) {
        return getApplicationContext().getBean(clazz);
    }

    /**
     * 获取注入对象
     *
     * @param name  对象名称
     * @param clazz 对象类型
     * @param <T>   泛型
     * @return 指定注入对象
     */
    public static <T> T getBean(String name, Class<T> clazz) {
        return getApplicationContext().getBean(name, clazz);
    }

}
