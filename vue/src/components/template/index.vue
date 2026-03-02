<template>
    <div class="fd-template">
        <h1>tamplate</h1>
        <p>{{userInfo}}</p>
        <button @click="method1">click</button>
        <router-link  to="/upload">upload</router-link>
    </div>
</template>
<script src="./index.js"></script>
<style lang="less" scoped>
    @import "./index.less";
</style>

