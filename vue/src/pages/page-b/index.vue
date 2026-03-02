<template>
    <div class="fd-page-b">
        <h2>{{name}}</h2>
        <p>{{name}}非常简单，就是展示集成的几个系统提示方法，估计每个系统都会有这种！大家可以参考！</p>
        <div class="fd-layout">
            <button @click="clickAlertSimple">alert simple按钮</button>
            <button @click="clickAlert">alert按钮</button>
            <button @click="clickPrompt">prompt按钮</button>
            <button @click="clickConfirm">confirm按钮</button>
            <br>
            <button @click="clickInfo">info 消息</button>
            <button @click="clickSuccess">success 消息</button>
            <button @click="clickWarning">warning 消息</button>
            <button @click="clickError">error 消息</button>
            <button @click="clickLoading">loading 消息</button>
            <br>
            <button @click="clickAjaxStart">ajax start </button>
        </div>

    </div>
</template>
<script src="./index.js"></script>
