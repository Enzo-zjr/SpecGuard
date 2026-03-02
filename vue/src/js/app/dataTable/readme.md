# 前台数据表规范

## 文件存放地址
前台数据字段表统一放到 js>app> dataTable > fdDataTable.js 中


## 前缀名
 table

 ## 结构
```
 var fdDataTable = {
     table20191:{
         table1: '是',
         table2: '否'
     }

 }

```
- table 为前缀
- table20191 中的 20191 为类型
- table1， table2 为 20191类型下的值