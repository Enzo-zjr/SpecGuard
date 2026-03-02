<template>
    <div :class="wrapClasses" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <span class="fd-close" @click="close()"></span>
        <div class="fd-text" v-html="content"></div>
    </div>
</template>
<script type="text/ecmascript-6" src="./index.js"></script>
<style lang="less" scoped>
    //命名空间
    .fd-message {
        /*操作提示框*/
        position: fixed;
        left: 0;
        bottom: 0;
        min-width: 16px;
        min-height: 16px;
        z-index: 9999;

        &.default {
            background-color: rgba(0, 0, 0, 0.5);
        }
        &.information {
            background-color: #3399ff;
        }
        &.success {
            background-color: #49d864;
        }
        &.warning {
            background-color: #ff9900;
        }
        &.error {
            background-color: #fe8c8c;
        }
        &.loading {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            text-indent: -9999em;
            font: 0/0 SimSun;
            background: url(./images/loading-icon.gif) center center no-repeat;
        }

        .fd-close {
            position: absolute;
            top: 3px;
            right: 3px;
            width: 14px;
            height: 14px;
            cursor: pointer;
            background: url(./images/icon-close.png) center center no-repeat;
        }
        .fd-close:hover {

        }
        .fd-text {
            padding: 5px 20px;
            min-width: 140px;
            color: #fff;
            font: 14px/25px "microsoft yahei";
            white-space: nowrap;
            text-align: center;
        }
        // 消息提示的布局在中间的调整,以及正在需要加图标，以及有对应的正在初始化的状态
        &.error-text-icon,
        &.load-text-icon {
            top: 50%;
            left: 50%;
            bottom: auto;
            padding-top: 20px;
            padding-left: 30px;
            min-width: 200px;
            min-height: 75px;
            transform: translate(-50%);
        }
        &.error-text-icon {
            padding-bottom: 20px;
            background: #fe8c8c url(./images/icon-error.png) 20px center no-repeat;
        }
        &.load-text-icon {
            background: rgba(0, 0, 0, 0.5) url(./images/loading.gif) 20px center no-repeat;
        }
    }
</style>
