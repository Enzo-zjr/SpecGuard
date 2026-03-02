// https://eslint.org/docs/user-guide/configuring
// 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, !important

/*
 @update  20190717-wuwg
 1. // 指定解析器
  'parser': 'babel-eslint', //   'parser': 'esprima',Espree
  将这行代码放置parserOptions 中
 2. 增加 extends 扩展  'plugin:vue/essential', 'standard'
 目的为了解决eslint,验证 *.vue文件报错问题
 */

var b = {
    // 
    'root': true,

    // JavaScript 语言选项
    'parserOptions': {
        // 指定解析器
        'parser': 'babel-eslint', //   'parser': 'esprima',Espree
        // ECMAScript 版本
        'ecmaVersion': 6,
        // 设置为 'script' (默认) 或 'module'（如果你的代码是 ECMAScript 模块)。
        'sourceType': 'module',  // 
        //想使用的额外的语言特性:
        'ecmaFeatures': {
            // 启用 JSX
            'jsx': true,
            // 允许在全局作用域下使用 return 语句
            'globalReturn': true,
            // impliedStric 启用全局严格模式
            'impliedStrict': true,
            'modules': true
        }
    },
    // 扩展
    'extends': [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // 环境定义了预定义的全局变量。
    'env': {
        // 环境定义了预定义的全局变量。更多在官网查看
        'browser': true,
        'node': true,
        // 自动启用ES6语法
        'es6': true,
        'commonjs': true,
        'meteor': true,
        'mongo': true,
        'jquery': true,
        'amd': true
        /* browser - 浏览器全局变量。
         node - Node.js全局变量和Node.js范围。
         commonjs - CommonJS全局变量和CommonJS范围（将此用于使用Browserify / WebPack的仅浏览器代码）。
         shared-node-browser - Node.js和Browser共有的全局变量。
         es6- 启用除模块之外的所有ECMAScript 6功能（这会自动将ecmaVersion解析器选项设置为6）。
         worker - 网络工作者全局变量。
         amd- 根据amd规范定义require()和define()作为全局变量。
         mocha - 添加所有Mocha测试全局变量。
         jasmine - 为版本1.3和2.0添加了所有Jasmine测试全局变量。
         jest - Jest全局变量。
         phantomjs - PhantomJS全局变量。
         protractor - 量角器全局变量。
         qunit - QUnit全局变量。
         jquery - jQuery全局变量。
         prototypejs - Prototype.js全局变量。
         shelljs - ShellJS全局变量。
         meteor - 流星全球变量。
         mongo - MongoDB全局变量。
         applescript - AppleScript全局变量。
         nashorn - Java 8 Nashorn全局变量。
         serviceworker - 服务工作者全局变量。
         atomtest - 原子测试辅助全局。
         embertest - Ember测试辅助全局变量。
         webextensions - WebExtensions全局变量。
         greasemonkey - GreaseMonkey全局变量。
         这些环境不是互斥的，因此您可以一次定义多个环境。
         */
    },
    //-----插件 让eslint支持 JSX start
    'plugins': [
        'react'
        //  'html' // 
    ],
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    // 指定全局
    'globals': {
        __static: true
    },
    /**
     * 'off' 或 0 - 关闭规则
     * 'warn' 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
     * 'error' 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */
    'rules': {
        ////////////////
        // 可能的错误 //
        ////////////////
        'no-cond-assign': 2,//禁止条件表达式中出现赋值操作符
        // 禁用 console
        'no-console': 1,
        // 禁止在条件中使用常量表达式
        // if (false) {
        // doSomethingUnfinished();
        // } //cuowu
        'no-constant-condition': 2,
        //禁止在正则表达式中使用控制字符 ：new RegExp('\x1f')
        'no-control-regex': 2,
        // 数组和对象键值对最后一个逗号，
        // never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
        // always-multiline：多行模式必须带逗号，单行模式不能带逗号
        'comma-dangle': [2, 'never'],//对象字面量项尾不能有逗号
        // 禁止使用debugger
        // process.env.NODE_ENV === 'production' ? 2 : 0, !important
        'no-debugger': 2,
        //函数参数不能重复
        'no-dupe-args': 2,
        //在创建对象字面量时不允许键重复 {a:1,a:1}
        'no-dupe-keys': 2,
        //switch中的case标签不能重复
        'no-duplicate-case': 2,
        //块语句中的内容不能为空
        'no-empty': 2,
        // 禁止在正则表达式中使用空字符集 (/^abc[]/)
        'no-empty-character-class': 2,
        //禁止给catch语句中的异常参数赋值
        'no-ex-assign': 2,
        //禁止不必要的bool转换
        'no-extra-boolean-cast': 2,
        //  禁止不必要的括号 //(a * b) + c;//报错
        'no-extra-parens': 2,
        //禁止多余的冒号
        'no-extra-semi': 2,
        //禁止重复的函数声明
        'no-func-assign': 2,
        //禁止在块语句中使用声明（变量或函数声明,function 或 var ）
        'no-inner-declarations': [2, 'functions'],
        //禁止无效的正则表达式
        'no-invalid-regexp': 2,
        //不能有不规则的空格(禁止在字符串和注释之外不规则的空白)
        'no-irregular-whitespace': 2,
        //禁止在 in 表达式中出现否定的左操作数 (in 操作符的左边不能有!)
        'no-negated-in-lhs': 2,
        //禁止把全局对象 (Math 和 JSON) 作为函数调用 错误：var math = Math();
        'no-obj-calls': 2,
        // 禁止直接使用 Object.prototypes 的内置属性
        'no-prototype-builtins': 0,
        //禁止稀疏数组， [1,,2]
        'no-sparse-arrays': 2,
        //避免多行表达式
        'no-unexpected-multiline': 2,
        //不能有无法执行的代码
        /*
         function foo() {
         return true;
         console.log('done');//上句已经return 不可到达此句
         }
         */
        // 禁止在return、throw、continue 和 break语句之后出现不可达代码
        'no-unreachable': 2,
        //禁止比较时使用NaN，只能用isNaN()
        'use-isnan': 2,
        // 强制使用有效的 JSDoc 注释
        'valid-jsdoc': 1,
        //必须使用合法的typeof的值,typeof foo === 'undefimed' 错误
        'valid-typeof': 2,
        //禁止在正则表达式字面量中使用多个空格 /foo bar/
        'no-regex-spaces': 2,

        //////////////
        // 最佳实践 //
        //////////////
        //在对象中使用getter/setter,定义对象的set存取器属性时，强制定义get
        'accessor-pairs': 0,
        // 强制数组方法的回调函数中有 return 语句
        'array-callback-return': 0,
        // 块语句中使用var （强制把变量的使用限制在其定义的作用域范围内）
        'block-scoped-var': 0,
        //循环复杂度,也就是类似if else能连续接多少个
        'complexity': [1, 9],
        //要求 return 语句要么总是指定返回的值，要么不指定
        'consistent-return': 0,
        //必须使用 if(){} 中的{}，强制所有控制语句使用一致的括号风格
        'curly': [2, 'all'],
        //switch语句最后必须有default
        'default-case': 2,
        //对象访问符的位置，换行的时候在行首还是行尾
        // 强制object.key 中 . 的位置，参数:
        //      property，'.'号应与属性在同一行
        //      object, '.' 号应与对象名在同一行
        'dot-location': [2, 'property'],
        //避免不必要的方括号
        // 强制使用.号取属性
        //    参数： allowKeywords：true 使用保留字做属性名时，只能使用.方式取属性
        //                          false 使用保留字做属性名时, 只能使用[]方式取属性 e.g [2, {'allowKeywords': false}]
        //           allowPattern:  当属性名匹配提供的正则表达式时，允许使用[]方式取值,否则只能用.号取值 e.g [2, {'allowPattern': '^[a-z]+(_[a-z]+)+$'}]

        'dot-notation': [0, {'allowKeywords': true}],
        // 使用 === 替代 == allow-null允许null和undefined==
        'eqeqeq': [2, 'allow-null'],
        // 要求 for-in 循环中有一个 if 语句
        'guard-for-in': 0,
        // 禁止使用 alert confirm prompt
        'no-alert': 0,
        // 禁止使用arguments.caller或arguments.callee
        'no-caller': 1,
        // 不允许在 case 子句中使用词法声明
        'no-case-declarations': 2,
        //不能使用看起来像除法的正则表达式/=foo/
        // (禁止除法操作符显式的出现在正则表达式开始的位置)
        'no-div-regex': 1,
        //如果if语句里面有return,后面不能跟else语句
        'no-else-return': 1,
        // 禁止出现空函数.如果一个函数包含了一条注释，它将不会被认为有问题。
        'no-empty-function': 2,
        // 禁止使用空解构模式no-empty-pattern
        'no-empty-pattern': 2,
        //禁止对null使用==或!=运算符
        // 禁止在没有类型检查操作符的情况下与 null 进行比较
        'no-eq-null': 2,
        // 禁止使用eval
        'no-eval': 1,
        // 禁止扩展native对象
        'no-extend-native': 2,
        //禁止不必要的 .bind() 调用
        'no-extra-bind': 2,
        // 禁用不必要的标签
        'no-extra-label': 0,
        // 禁止switch穿透
        'no-fallthrough': 1,
        // 禁止数字字面量中使用前导和末尾小数点(禁止省略浮点数中的0 .5 3.  )
        'no-floating-decimal': 2,
        //禁止隐式转换 (禁止使用短符号进行类型转换(!!fOO))
        'no-implicit-coercion': 1,
        // 禁止在全局范围内使用 var 和命名的 function 声明
        'no-implicit-globals': 1,
        //禁止使用隐式eval
        //  禁止使用类似 eval() 的方法，setTimeout()、setInterval()不写字符串
        'no-implied-eval': 2,
        // 禁止无效的this，只能用在构造器，类，对象字面量
        // 禁止 this 关键字出现在类和类对象之外
        'no-invalid-this': 1,
        //禁止使用__iterator__ 属性
        'no-iterator': 2,
        //禁止标签声明
        'no-labels': 2,
        //禁止不必要的嵌套块
        'no-lone-blocks': 2,
        // 禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
        // 禁止在循环中出现 function 声明和表达式
        'no-loop-func': 2,
        // 禁用魔术数字(3.14什么的用常量代替)
        'no-magic-numbers': [1, {'ignore': [0, -1, 1]}],
        //不能用多余的空格
        'no-multi-spaces': 2,
        //字符串不能用\换行
        'no-multi-str': 2,
        //不能重写native对象
        'no-native-reassign': 2,
        //禁止在使用new构造一个实例后不赋值
        'no-new': 2,
        // 禁止对 Function 对象使用 new 操作符
        'no-new-func': 1,
        //禁止使用new创建包装实例，new String new Boolean new Number
        'no-new-wrappers': 2,
        //禁止使用八进制数字
        'no-octal': 2,
        //禁止使用八进制转义序列
        'no-octal-escape': 2,
        //不允许对 function 的参数进行重新赋值
        'no-param-reassign': 2,
        //禁止使用__proto__属性
        'no-proto': 2,
        //禁止重复声明变量
        'no-redeclare': 2,
        // return 语句中不能有赋值表达式
        'no-return-assign': 2,
        // 禁止使用 javascript: url
        'no-script-url': 0,
        // 禁止自我赋值
        'no-self-assign': 2,
        //禁止比较自身
        'no-self-compare': 2,
        //禁止使用逗号运算符
        'no-sequences': 2,
        //禁止抛出字面量错误 throw 'error';
        'no-throw-literal': 2,
        // 禁用一成不变的循环条件
        'no-unmodified-loop-condition': 2,
        //禁止无用的表达式
        'no-unused-expressions': 2,
        // 禁用未使用过的标签
        'no-unused-labels': 2,
        //禁止不必要的call和apply
        'no-useless-call': 2,
        // 禁止不必要的字符串字面量或模板字面量的连接
        'no-useless-concat': 2,
        // 禁用不必要的转义字符
        'no-useless-escape': 2,
        //禁用void操作符
        'no-void': 2,
        // 禁止在注释中使用特定的警告术语
        'no-warning-comments': [1, {'terms': ['todo', 'fixme', 'xxx'], 'location': 'start'}],
        //禁用with
        'no-with': 2,
        //parseInt必须指定第二个参数
        'radix': 1,
        // var必须放在作用域顶部
        'vars-on-top': 2,
        //立即执行函数表达式(IIFE)的小括号风格
        'wrap-iife': [2, 'inside'],
        //禁止尤达条件
        // if ('red' === color) {
        // ...
        // }
        // Yoda 条件是如此命名的，因为条件的字面值首先出现，而变量出现在第二位。
        'yoda': [2, 'never'],
        //使用严格模式
        'strict': 1,
        //////////////
        //  变量声明 //
        //////////////
        //声明时必须赋初值
        'init-declarations': 0,
        //禁止catch子句参数与外部作用域变量同名
        'no-catch-shadow': 1,
        //不能对var声明的变量使用delete操作符
        'no-delete-var': 2,
        //label名不能与var声明的变量名相同
        'no-label-var': 2,
        // 禁用特定的全局变量
        'no-restricted-globals': 1,
        // 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
        'no-shadow': 1,
        // 严格模式中规定的限制标识符，不能作为声明时的变量名使用
        'no-shadow-restricted-names': 2,
        // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
        'no-undef': 1,
        // 禁止变量初始化时直接给它赋值为undefined
        'no-undef-init': 2,
        //禁止使用undefined
        'no-undefined': 2,
        //禁止有声明后，未被使用的变量或参数
        'no-unused-vars': [2, {'vars': 'all', 'args': 'after-used'}],
        //禁止未定义前不能使用
        'no-use-before-define': 2,


        //////////////////////////
        // Node.js and CommonJS //
        //////////////////////////
        //避免多次调用回调什么的
        'callback-return': 0,
        // 要求 require() 出现在顶层模块作用域中
        'global-require': 1,
        //nodejs 处理错误，要求回调函数中有容错处理
        'handle-callback-err': [2, '^(err|error)$'],
        // 禁止混合常规 var 声明和 require 调用
        'no-mixed-requires': [0, false],
        // 禁止调用 require 时使用 new 操作符
        'no-new-require': 2,
        // node中不能使用__dirname或__filename做路径拼接
        'no-path-concat': 0,
        // 禁止使用process.env
        'no-process-env': 0,
        //禁止使用process.exit()
        'no-process-exit': 0,
        //nodejs 禁止同步方法
        'no-sync': 0,
        //如果禁用了指定模块，使用就会报错
        'no-restricted-modules': 0,

        //////////////
        // 风格指南  //
        //////////////
        // 指定数组的元素之间要以空格隔开(, 后面)，
        // never参数：[ 之前和 ] 之后不能带空格，
        // always参数：[ 之前和 ] 之后必须带空格
        'array-bracket-spacing': [2, 'never'],
        // 禁止或强制在单行代码块中使用空格(禁用)
        'block-spacing': [1, 'never'],
        //大括号风格
        // 强制使用一致的缩进 第二个参数为 'tab' 时，会使用tab，
        // if while function 后面的{必须与if在同一行，java风格。
        'brace-style': [2, '1tbs'],
        //强制驼峰法命名
        'camelcase': 2,
        //控制逗号前后的空格
        'comma-spacing': [2, {'before': false, 'after': true}],
        // 控制逗号在行尾出现还是在行首出现 (默认行尾)
        // http://eslint.org/docs/rules/comma-style
        'comma-style': [2, 'last'],
        //'SwitchCase' (默认：0) 强制 switch 语句中的 case 子句的缩进水平
        // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
        'computed-property-spacing': [0, 'never'],
        //this别名
        // 用于指统一在回调函数中指向this的变量名，
        // 箭头函数中的this已经可以指向外层调用者，应该没卵用了
        // e.g [0,'that'] 指定只能 var _this = this.
        // _this不能指向其他任何值，this也不能赋值给_this以外的其他值
        'consistent-this': [1, '_this'],
        //函数表达式必须有名字
        'func-names': 0,
        // 文件末尾强制换行
        'eol-last': 2,
        //缩进风格
        'indent': [2, 4, {'SwitchCase': 1}],
        //对象字面量中冒号的前后空格
        // 强制在对象字面量的属性中键和值之间使用一致的间距
        'key-spacing': [0, {'beforeColon': false, 'afterColon': true}],
        // 换行风格
        'linebreak-style': [1, 'windows'],
        //行前/行后备注
        // 要求在注释周围有空行( 要求在块级注释之前有一空行)
        'lines-around-comment': [1, {'beforeBlockComment': true}],
        //函数风格，规定只能使用函数声明/函数表达式
        //  强制一致地使用函数声明或函数表达式，方法定义风格，参数：
        //    declaration: 强制使用方法声明的方式，function f(){} e.g [2, 'declaration']
        //    expression：强制使用方法表达式的方式，var f = function() {}  e.g [2, 'expression']
        //    allowArrowFunctions: declaration风格中允许箭头函数。 e.g [2, 'declaration', { 'allowArrowFunctions': true }]

        'func-style': [0, 'declaration'],

        // 禁止使用指定的标识符
        'id-blacklist': 0,
        //变量名长度,强制标识符的最新和最大长度
        'id-length': 0,
        //命名检测,要求标识符匹配一个指定的正则表达式
        'id-match': 0,
        // 强制在 JSX 属性中一致地使用双引号或单引号
        'jsx-quotes': 1,
        // 强制在关键字前后使用一致的空格 (前后都需要)
        'keyword-spacing': 2,
        //强制一行的最大长度
        'max-len': [1, 200],
        // 强制最大行数
        'max-lines': 0,
        //函数最多只能有3个参数
        'max-params': [0, 3],
        // 函数内最多有几个声明
        'max-statements': [0, 50],
        //嵌套块深度
        'max-depth': [0, 4],
        //回调嵌套深度, 强制回调函数最大嵌套深度 3层
        'max-nested-callbacks': [1, 3],
        // 强制每一行中所允许的最大语句数量
        'max-statements-per-line': 1,
        //函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
        'new-cap': [2, {'newIsCap': true, 'capIsNew': false}],
        //new无参构造函数时，必须有圆括号
        'new-parens': 2,
        //变量声明后是否需要空一行
        'newline-after-var': 0,
        //禁止使用 Array 构造函数
        'no-array-constructor': 2,
        //禁止使用按位运算符
        'no-bitwise': 0,
        // 要求 return 语句之前有一空行
        'newline-before-return': 0,
        // 要求方法链中每个调用都有一个换行符
        'newline-per-chained-call': 2,
        //禁止使用continue
        'no-continue': 0,
        //禁止在代码行后使用内联注释
        'no-inline-comments': 2,
        //禁止else语句内只有if语句
        'no-lonely-if': 2,
        // 禁止混合使用不同的操作符
        'no-mixed-operators': 0,
        //禁止混用tab和空格
        'no-mixed-spaces-and-tabs': [2, false],
        //空行最多不能超过2行
        'no-multiple-empty-lines': [2, {'max': 2}],
        // 不允许否定的表达式
        'no-negated-condition': 0,
        //禁止使用嵌套的三目运算
        'no-nested-ternary': 0,
        //禁止使用new Object()
        'no-new-object': 2,
        //禁止使用++，--
        'no-plusplus': 0,
        // 禁止使用特定的语法
        'no-restricted-syntax': 0,
        //函数调用时 函数名与()之间不能有空格
        'no-spaced-func': 2,
        //禁止使用三目运算符
        'no-ternary': 0,
        //一行结束后面不要有空格(版本工具会识别成区别代码)
        'no-trailing-spaces': 2,
        // 禁止标识符中有悬空下划线_bar
        'no-underscore-dangle': 0,
        // 禁止可以在有更简单的可替代的表达式时使用三元操作符
        //禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
        'no-unneeded-ternary': 2,
        // 禁止属性前有空白
        'no-whitespace-before-property': 2,
        // 强制花括号内换行符的一致性
        // 1. "ObjectExpression" 对象文字的配置，总是需要换行。
        // 2. "ObjectPattern" 配置解构赋值的对象模式，如果属性内或属性之间存在换行符，则"multiline": true （默认）需要换行符，"minProperties": 2 属性多余2条才需要换行
        // 3. 导入声明不再做检测
        // 4. 导出声明，如果属性内或属性之间存在换行符，则"multiline": true （默认）需要换行符，
        'object-curly-newline': ["error", {
          // "ObjectExpression": "always",
          "ObjectPattern": { "minProperties": 2 },
          "ImportDeclaration": "never",
          "ExportDeclaration": { "multiline": true, "minProperties": 3 }
        }],
        //大括号内是否允许不必要的空格
        'object-curly-spacing': [2, 'never'],
        // 强制将对象的属性放在不同的行上
        'object-property-newline': 2,
        // 强制函数中的变量要么一起声明要么分开声明
        'one-var': 1,
        // 要求或禁止在 var 声明周围换行
        'one-var-declaration-per-line': 2,
        // 要求或禁止在可能的情况下要求使用简化的赋值操作符 （赋值运算符 += -=什么的）
        'operator-assignment': [0, 'always'],
        //换行时运算符在行尾还是行首
        'operator-linebreak': [2, 'after', {'overrides': {'?': 'before', ':': 'before'}}],
        // 块语句内行首行尾是否要空行
        'padded-blocks': [2, 'never'],
        //对象字面量中的属性名是否强制双引号
        'quote-props': 0,
        //引号类型 `` '' ''
        'quotes': [2, 'single', {'avoidEscape': true}],
        // 要求使用 JSDoc 注释
        'require-jsdoc': 1,
        //语句强制分号结尾
        'semi': [2, 'always'],
        // 强制分号之前和之后使用一致的空格
        'semi-spacing': [2, {'before': false, 'after': true}],
        //要求同一个声明块中的变量按顺序排列
        'sort-vars': 0,
        //不以新行开始的块{前面要不要有空格
        'space-before-blocks': [2, 'always'],
        //函数定义时括号前面要不要有空格
        'space-before-function-paren': [2, {'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always'}],
        //小括号里面要不要有空格
        'space-in-parens': [2, 'never'],
        //要求操作符周围有空格
        'space-infix-ops': 2,
        //一元运算符的前/后要不要加空格
        'space-unary-ops': [0, {'words': true, 'nonwords': false}],
        // 强制在注释中 // 或 /* 使用一致的空格
        'spaced-comment': [2, 'always', {'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!']}],
        // 要求或禁止 Unicode BOM
        'unicode-bom': 0,
        //正则表达式字面量用小括号包起来
        'wrap-regex': 2,


        //////////////
        // ES6.相关 //
        //////////////
        // 要求箭头函数体使用大括号
        'arrow-body-style': 2,
        //要求箭头函数的参数使用圆括号
        'arrow-parens': 0,
        //=>的前/后括号
        'arrow-spacing': [2, {'before': true, 'after': true}],
        //非派生类不能调用super，派生类必须调用super
        // 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示
        'constructor-super': 0,
        // 生成器函数*的前后空格
        'generator-star-spacing': [2, {'before': true, 'after': true}],
        //禁止给类赋值
        'no-class-assign': 2,
        // 不允许箭头功能，在那里他们可以混淆的比较
        'no-confusing-arrow': 0,
        //禁止修改const声明的变量
        'no-const-assign': 2,
        // 禁止类成员中出现重复的名称
        'no-dupe-class-members': 2,
        // 不允许复制模块的进口
        'no-duplicate-imports': 2,
        // 禁止 Symbol  的构造函数
        'no-new-symbol': 2,
        // 允许指定模块加载时的进口
        'no-restricted-imports': 0,
        //禁止在构造函数中，在调用 super() 之前使用 this 或 super
        'no-this-before-super': 2,
        // 禁止不必要的计算性能键对象的文字
        'no-useless-computed-key': 0,
        //禁用var，用let和const代替
        'no-var': 1,
        // 要求或禁止对象字面量中方法和属性使用简写语法
        'object-shorthand': 0,
        // 要求使用箭头函数作为回调
        'prefer-arrow-callback': 0,
        // 要求使用 const 声明那些声明后不再被修改的变量
        'prefer-const': 1,
        // 要求在合适的地方使用 Reflect 方法
        'prefer-reflect': 0,
        // 要求使用扩展运算符而非 .apply()
        'prefer-spread': 0,
        // 要求使用模板字面量而非字符串连接
        'prefer-template': 1,
        // Suggest using the rest parameters instead of arguments
        'prefer-rest-params': 0,
        //生成器函数必须有yield
        'require-yield': 0,
        // enforce spacing between rest and spread operators and their expressions
        'rest-spread-spacing': 0,
        // 强制模块内的 import 排序
        'sort-imports': 0,
        // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
        'template-curly-spacing': 1,
        // 强制在 yield* 表达式中 * 周围使用空格
        'yield-star-spacing': 2,
        //禁止使用空label ,
        // 禁止除循环和开关之外的任何标签,【no-empty-label】此规则已在ESLint v2.0 中删除，并替换为无标签规则。
        //  'no-empty-label': 2,
        //////////////
        // removed.相关 //
        //////////////
        //关键字后面是否要空一格
        // 'space-after-keywords': [0, 'always'],
        //return throw case后面要不要加空格
        //  'space-return-throw-case': 2,
    }
}