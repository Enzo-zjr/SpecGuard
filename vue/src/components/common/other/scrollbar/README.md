# vcc-scrollbar
vue 自定义滚动条组件



## Install
```bash
npm install --save @thunisoft/vcc-scrollbar

```

## 全局注册
```js
// main.js
// vccScrollbar组件
// 引入js   
import  '@thunisoft/vcc-scrollbar';
// 引入css 
import  '@thunisoft/vcc-scrollbar/dist/static/vcc-scrollbar.css';
// 使用组件
Vue.use(window.vccScrollBar)

```

## 局部注册

```vue
<vcc-scrollbar > </vcc-scrollbar>

<script>
import  '@thunisoft/vcc-scrollbar';

export default {
  components: {
    'vcc-scrollbar': window.vccScrollBar.scrollBar
  }
};

</script>
```


##  script 方式使用方案

1. 下载资源包
2. 找到dist下的js和css文件，复制到项目
3. 引入到项目， 注意 `vue`,必须在该js之前引入
4. 资源包下的test 文件夹有参考事例

```
// css
    <link rel="stylesheet" href="./static/vcc-scrollbar.css">
//  js
<script src="./vue.js"></script>
<script src="./static/vcc-scrollbar.js"></script>

项目中使用

<vcc-scrollbar class="fd-scrollbar-contain">
    <p>aaas</p>
 </vcc-scrollbar>
```

## 在线Demo
暂无，先参考
###  基础竖向滚动条
![preview-scrollbar.png](http://open.thunisoft.com/vcc-pdf-cli/fd-component-img/raw/master/vcc-scrollbar/preview-scrollbar.png)
###  竖向和横向滚动条并存
![preview-scrollbar2.png](http://open.thunisoft.com/vcc-pdf-cli/fd-component-img/raw/master/vcc-scrollbar/preview-scrollbar2.png)


## Browser support

ie10+， chrome

## API
## API

### Props
序号 | name |含义 | 类型 | 默认值
---| ---     | ------ | --- | --- |
1 | show      | 滚动条默认是否显示 | Boolean | true
2 | responseType   | 是否启动响应式， 默认启动 | Boolean | true
3 | attributeFilter   | 响应式监听的属性值，需要responseType设置为true | Array |  ['style', 'class']
4 | tweenTime   |  动画的缓动时间，单位毫秒, 如调用update()方法，点击滚动条得滑倒，滚动条滚动，耗时都是用的这个数值 | Number |  200
5 | delay   |   【上拉刷新---下拉加载】间隔时间，单位毫秒，主要为了提升性能，默认为500  | Number |  200
6 | scrollbarMinSize   |   滚动条最小的尺寸(单位是px)  | Number |  30
7 | pressExtendScrollbarSize   |   拖拽滚动条时，扩展滚动条大小 ,此处通过css控制 ， 外围容器增加 pressed 类名| Boolean |  false

  
### Events

序号 | 事件名   | 说明
---|---|---|
1  | @scrollToUpper |   触发事件【滚动条触顶事件】   this.$emit('scrollToUpper', this.scrollTop, this.scrollLeft);
2  | @scrollToLower |   触发事件【滚动条触底事件】    this.$emit('scrollToLower', this.scrollTop, this.scrollLeft);
3  | @scroll |   触发事件【滚动条滚动事件】    this.$emit('scroll', this.scrollTop, this.scrollLeft);
4  | @mutationObserver | 触发事件【滚动条因内部内容高度发生变化触发的事件】    this.$emit('mutationObserver', this.scrollTop, this.scrollLeft);
4  | @ready | 触发事件【滚动条加载完成并且插入到触发的事件】   this.$emit('ready', this);


### methods
序号  | 方法名称 | 说明
---  | ----    | --- |
1   | updateTop   |  更新纵向滚动条位置的处理函数，  updateTop(top, callback, animateFlag)
2   | updateLeft   |  更新横向滚动条位置的处理函数，  updateLeft(left, callback, animateFlag)
3   | update   |  更新滚动条的处理函数，纵向和横向都更新，   update(top, left, callback, animateFlag)
4   | refresh   |  refresh 刷新方法，先初始化参数initParams()，再设置滚动条样式scrollHandle()，  refresh(emitScroll = false, callback)
5   | getScrollBarSize   | 获取浏览器滚动条的大小，返回浏览器滚动条的大小，  getScrollBarSize()



## Examples

```
   <vcc-scrollbar > </vcc-scrollbar>

```




## 版本更新
-  1.0.0
    修改readme.md 文档  ,自定义滚动条组件
-  1.0.1
    修改readme.md 文档  ,添加缩略图

-  1.1.0
    - 去除scrollbar的依赖， 让其可以单独npm install 的方式使用,
    - 更新package.json
-  1.1.1
    -  修改 package.json配置
-  1.1.2
    -  修改 package.json配置
-  1.1.3
    -  修改 package.json配置
-  1.1.4
    -  修改 打包方式
-  1.1.5
    -  修改打包方式
-  1.1.6
    -  测试
-  1.1.7
    -  测试
-  1.1.8
    -  测试
-  1.1.9
    -  目前的打包有问题，无法导出模块，暂时先增加全局变量  window.vccScrollBar
-  1.1.20
    - 去除无效代码
-  1.2.0
    - 增加mutationObserver事件，
    - 内部调用刷新（refresh）方法，默认不触发 scroll事件，增加第二参数callback， 刷新后的回调函数
    -  updateTop,updateLeft, update 都增加动画控制参数，animateFlag ， 默认取值= true， 表示有动画， 动画时长和 tweenTime 相关 
-  1.2.1
    - 更新说明文档，优化排版
-  1.2.2
    - 拖拽滚动条时取消延迟动画，提升性能
    ```
     // presss
       &.pressed, &.pressed:hover {
           background-color: #999;
           //注意在按下的时候一定不要有动画，会影响性能
           transition: none;
       }
      
    ```
    - 去掉滚动时的动画延迟，
    ```
     .@{css-prefix-scroll-bar} {
         // transition: top 0.1s 0s linear;
     }
    ```
-  1.2.3
    - 滚动条的宽度默认设置成8px
    
-  1.3.0
    - 增加字段 pressExtendScrollbarSize， 拖拽滚动条时，扩展滚动条大小 ,此处通过css控制， 外围容器增加 pressed 类名
-  1.4.0
    -  滚动条和滚动区域增加帧动画限制，以提升性能
-  1.4.1
    -  快速滚动，设置滚动条位置，由防抖变成节流
