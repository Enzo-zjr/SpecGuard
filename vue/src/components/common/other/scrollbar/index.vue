<template>
    <!--滚动条容器组件-->
    <div :class="wrapClasses"  >
        <div :class="scrollbarAreaClasses"
             :style ="style"
             @scroll="scrollHandle"
             @wheel="wheelHandle"
             @mousewheel="mousewheelHandle"
             ref="scrollArea"
             @touchstart.stop="startDrag"
             @touchmove.stop="onDrag"
             @touchend.stop="stopDrag">
            <div  ref="scrollContent" :class="scrollbarContentClasses">
            <!--    <div class="fd-fixepos">
                    <h3>测试代码</h3>
                    <p> scrollLeft：：：：：：： {{scrollLeft}}</p>
                    <p> scrollTop：：：：：：： {{scrollTop}}</p>
                    <p> validRealScrollTopDistance： {{validRealScrollTopDistance}}</p>
                    <p> validRealScrollLeftDistance： {{validRealScrollLeftDistance}}</p>
                </div>-->
                <slot></slot>
            </div>
        </div>
        <!--滚动区域-->

        <!--垂直滚动条-->
        <vertical-scrollbar
                ref="verticalScrollbar"
                v-if="hasVerticalScrollBar"

                :cscrollAreaHeight="scrollAreaHeight"
                :cscrollWrapperHeight="scrollWrapperHeight"
                :cscrollTop="scrollTop"

                :tweenTime="tweenTime"
                :scrollbarMinSize="scrollbarMinSize"
                :pressExtendScrollbarSize="pressExtendScrollbarSize"

                @changeScrollTop="handleChangeScrollTop" >
        </vertical-scrollbar>
        <!--水平滚动条-->

        <horizontal-scrollbar
                ref="horizontalScrollbar"
                v-if="hasHorizontalScrollBar"

                :cscrollAreaWidth="scrollAreaWidth"
                :cscrollWrapperWidth="scrollWrapperWidth"
                :cscrollLeft="scrollLeft"

                :tweenTime="tweenTime"
                :scrollbarMinSize="scrollbarMinSize"
                :pressExtendScrollbarSize="pressExtendScrollbarSize"

                @changeScrollLeft="handleChangeScrollLeft" >
        </horizontal-scrollbar>
    </div>
</template>
<script type="text/ecmascript-6"  src="./index.js"></script>
<!--样式表-->
<style lang="less">
    @import "./index.less";
</style>
