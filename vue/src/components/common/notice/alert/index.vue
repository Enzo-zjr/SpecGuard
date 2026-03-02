<template>
    <transition :name="animateName">
        <div :class="wrapClasses">
            <div :class="popupClasses"  :style="currentStyle">
                <header  :class="popupHeaderClasses">
                    <h3  v-text="title"></h3>
                </header>
                <!--popupClasses end-->
                <div :class="popupBodyClasses">
                    <div  class="alert-content" v-html="content" > </div>
                    <div  class="alert-input-wrap" v-if= "type === 'prompt'">
                        <input type="text"   v-model="currentValue">
                    </div>
                </div>
                <!--popupBodyClasses end-->
                <div  :class="popupFooterClasses">
                    <button  class="alert-btn confirm"  v-if="confirm.show" v-text="confirm.text"  @click="clickConfirm()"></button>
                    <button  class="alert-btn cancel"  v-if="cancel.show" v-text="cancel.text"  @click="clickCancel()"></button>
                </div>
                <!--popupFooterClasses end-->
            </div>
            <!--popupClasses end-->
        </div>
        <!--wrapClasses end-->
    </transition>
</template>
<script type="text/ecmascript-6"  src="./index.js" ></script>
<style lang="less" >
    @import "./index.less";
</style>
