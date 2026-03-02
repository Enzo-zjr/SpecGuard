import request from "./request/request.js";

export default {
    mixins: [request],
    data(){
        return {
            file: [],
            excelInfo: {},
            token: '',
        }
    },
    mounted(){
    },
    methods:{
        uploadfile(file) {
            let formData = new FormData();
            formData.append('file', file.raw)
            this.upload(window.fdConfig.url.test.uploadFile, formData
            ,window.fdConfig.methodPost).then(data => {
                this.excelInfo = data.data;
                console.log(data);
            });
        },

        removeBefore(){
            if (fileList.length > 0) {
                this.file = [fileList[fileList.length - 1]]
            }
        },
    }
}
