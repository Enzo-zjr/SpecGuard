## babel-polyfill太大问题

### 什么是babel-polyfill

babel只负责语法转换，比如将ES6的语法转换成ES5。但如果有些对象、方法，浏览器本身不支持，比如：

全局对象：Promise、WeakMap 等。
全局静态函数：Array.from、Object.assign 等。
实例方法：比如 Array.prototype.includes 等。
此时，需要引入babel-polyfill来模拟实现这些对象、方法。

#### 入门例子
- 首先，安装依赖。
```
npm install babel-cli --save-dev
npm install webpack@2.7 --save-dev
npm install babel-polyfill --save

```
- 创建 index.js，在最前面引入依赖babel-polyfill，接着通过webpack将依赖打包进去。

```
// index.js
require('babel-polyfill');

var arr = Array.from('foo');
console.log(arr);  // [ 'f', 'o', 'o' ]

```

- webpack配置文件如下：

```
// webpack.config.js
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'        
  }
};

```

webpack打包的时候，从输出大致可以看出引入了哪些依赖。

```
$ `npm bin`/webpack
Hash: 723f2ccdfa0bd8736d3c
Version: webpack 2.7.0
Time: 1080ms
  Asset    Size  Chunks                    Chunk Names
main.js  266 kB       0  [emitted]  [big]  main
 [124] (webpack)/buildin/global.js 509 bytes {0} [built]
 [125] ./~/babel-polyfill/lib/index.js 833 bytes {0} [built]
 [126] ./index.js 96 bytes {0} [built]
 [127] ./~/babel-polyfill/~/regenerator-runtime/runtime.js 24.4 kB {0} [built]
 [128] ./~/core-js/fn/regexp/escape.js 108 bytes {0} [built]
 [314] ./~/core-js/modules/es7.string.pad-start.js 499 bytes {0} [built]
 [315] ./~/core-js/modules/es7.string.trim-left.js 219 bytes {0} [built]
 [316] ./~/core-js/modules/es7.string.trim-right.js 219 bytes {0} [built]
 [317] ./~/core-js/modules/es7.symbol.async-iterator.js 43 bytes {0} [built]
 [318] ./~/core-js/modules/es7.symbol.observable.js 40 bytes {0} [built]
 [319] ./~/core-js/modules/es7.system.global.js 144 bytes {0} [built]
 [320] ./~/core-js/modules/es7.weak-map.from.js 113 bytes {0} [built]
 [321] ./~/core-js/modules/es7.weak-map.of.js 109 bytes {0} [built]
 [322] ./~/core-js/modules/es7.weak-set.from.js 113 bytes {0} [built]
 [327] ./~/core-js/shim.js 8.18 kB {0} [built]
    + 313 hidden modules

```

在[327] ./~/core-js/shim.js这个依赖中，就引入了Array.from()这个方法。

```
require('./modules/es6.array.from');

```


### 按需加载

在前面的例子中，一个不到100字节的index.js，转码完成后，
变成了259K的main.js，这从性能优化的角度来看是难以接受的。

```
$ ll -h index.js build/main.js 
-rw-r--r--  1 a  staff   259K  5 31 14:31 build/main.js
-rw-r--r--  1 a  staff    96B  5 31 14:25 index.js

```

### 解决方法：可以采取按需引入来优化性能。


babel-polyfill主要包含了core-js和regenerator两部分。

babel-polyfill：提供了如ES5、ES6、ES7等规范中 中新定义的各种对象、方法的模拟实现。
regenerator：提供generator支持，如果应用代码中用到generator、async函数的话用到。

** 优化后的代码如下: **

```
// index.js
require('core-js/modules/es6.array.from');

var arr = Array.from('foo');
console.log(arr);  // [ 'f', 'o', 'o' ]

```

优化效果如下：（259K -> 17K） 

```
$ ll -h index.js build/main.js
-rw-r--r--  1 a  staff    17K  5 31 15:01 build/main.js
-rw-r--r--  1 a  staff   112B  5 31 14:59 index.js

```

如果觉得逐个对象、方法按需加载比较繁琐，也可以批量按需加载。

比如，按需加载ES6中新定义的方法/对象。

```
require('core-js/es6');  // core-js/es6/index.js 中引入了es6相关的polyfill

```
或者，按需加载 ES6 的Array对象上新定义的方法。

```
require('core-js/es6/array');

```

###  相关链接
[https://babeljs.io/docs/en/babel-polyfill/](https://babeljs.io/docs/en/babel-polyfill/)


