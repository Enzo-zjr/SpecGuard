<template>
    <div :class="warpClass"><span class="fd-loading-img"></span></div>
</template>
<script type="text/ecmascript-6" src="./index.js"></script>
<style lang="less" scoped>
    .fd-ajax-loading {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);
        // 加载的图标
        > .fd-loading-img {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 2;
            margin-top: -32px;
            margin-left: -32px;
            width: 64px;
            height: 64px;
            background: url(./images/loading.gif) center center no-repeat;
        }
        // 显示加载图标
        &.show {
            display: block;
        }
    }
</style>
