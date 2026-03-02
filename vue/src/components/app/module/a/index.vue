<template>
    <div class="fd-module-a">
        <h3>【ac-module-a】 组件</h3>
        <p>当前的用户 <span v-text="currentUser"></span></p>
        <input type="text" v-model="currentUser" >
        <button @click="clickGetUser">获取用户信息</button>
    </div>
</template>
<script src="./index.js"></script>
