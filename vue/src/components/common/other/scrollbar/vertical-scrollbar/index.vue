<template>
    <div :class="wrapClasses"  @click="clickGoto" >
        <div :class="scrollbarClass" ref="scrollbar" :style="style"
             @touchstart.stop="startDrag"
             @mousedown.stop="startDrag">
        </div>
    </div>
</template>
<script type="text/ecmascript-6"  src="./index.js"></script>
