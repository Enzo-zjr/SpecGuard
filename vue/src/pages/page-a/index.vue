<template>
    <div class="fd-page-a">
        <h2>{{name}}</h2>
        <p>{{name}}引入了【公用组件】和【业务组件】</p>
        <div class="fd-layout">
            <cc-scrollbar >
                <div class="fd-scrollbar-con">
                    <h3>【cc-scrollbar】 组件</h3>
                    <p v-for="(item, index) in dataList" :key="index">数据内容{{index + 1}}</p>
                </div>
            </cc-scrollbar>
            <moduleA></moduleA>
         </div>
    </div>
</template>
<script src="./index.js"></script>
