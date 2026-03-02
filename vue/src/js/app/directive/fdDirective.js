/**
 *@file fdDirective
 *@version 1.0.1
 *@author wuwg
 *@createTime 2019/10/18 - 11:31
 *@updateTime 2019/10/18 - 11:31
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 @description fdDirective 全局指令
 */
import Vue from 'vue';
import clickoutside from './clickoutside/index.js';
// 点击外围
Vue.directive('clickoutside', clickoutside);
