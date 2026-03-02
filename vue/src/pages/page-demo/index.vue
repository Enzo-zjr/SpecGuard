<template>
    <el-container style="height: 100%; width: 100%;">
        <el-header style="background: beige;">

        </el-header>
        <el-aside>

        </el-aside>
        <el-main>
            <div class="main">
                <el-upload class="upload-demo" ref="upload" action="#" :on-change="uploadfile" 
                    :file-list="file" :auto-upload="false" :show-file-list="false" :before-upload="removeBefore">
                    <el-button id="uploadfile" class="fd-multi-button-upload" slot="trigger" type="primary" >导入文件</el-button>
                </el-upload>
            </div>
        </el-main>
    </el-container>

</template>

<script src="./index.js">

</script>

<style>
.main {
    height: 100%;
    width: 100%;
}
</style>
