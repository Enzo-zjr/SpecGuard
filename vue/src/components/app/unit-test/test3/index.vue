<template>
    <div class="fd-test3">
        <h1>异步获取数据</h1>
        <p  id="jsP">{{test}}</p>
        <ul>
            <li v-for="item in data" v-text="item.name" :key="item.id"></li>
        </ul>
        <button @click="clickGetData">getData</button>
    </div>
</template>

<script src="./index.js"></script>

