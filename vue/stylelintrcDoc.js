const b = {
    // stylelint-config-standard 相关配置就是我们现在的配置，所以无需扩展，在.stylelintrc，去掉这个【extends】值就行
    // 20190402-wuwg
    'extends': 'stylelint-config-standard',
    'plugins':[
        'stylelint-order'
    ],
    'rules': {
        // 指定一个模式类选择符，限制选择器名称写法
        'selector-class-pattern': '^[a-z]+([a-z0-9]?|[a-z0-9\\-\\_]*[a-z0-9])$',
        // 为ID选择器指定模式。
        // 指定一个模式，id选择器，限制选择器名称写法
        'selector-id-pattern': '^[a-z]+([a-z0-9]?|[a-z0-9\\-\\_]*[a-z0-9])$',
        // 不允许在简写属性冗余值
        'shorthand-property-no-redundant-values': true,
        // 允许嵌套的深度为6
        'max-nesting-depth': 6,
        // 指定字串，双引号
        'string-quotes': 'double',
        // 禁止未知的规则。
        'at-rule-no-unknown': true,
        // 要求或禁止网址的引号, 地址一定要写引号
        'function-url-quotes': 'always',
        //  属性值小写
        'value-keyword-case': 'lower',
        // 禁止空块。
        'block-no-empty': true,
        // 禁止无效的十六进制颜色。
        'color-no-invalid-hex': true,
        // 禁止空评论。
        'comment-no-empty': true,
        // 禁止声明块中的重复属性
        'declaration-block-no-duplicate-properties': [
            true,
            {
                'ignore': [
                    'consecutive-duplicates-with-different-values'
                ]
            }
        ],
        // 禁止覆盖声明块中相关的longhand属性的速记属性。
        'declaration-block-no-shorthand-property-overrides': true,
        // 禁止可以合并为一个速记属性的longhand属性。
        'declaration-block-no-redundant-longhand-properties': false,
        // 禁止重复的字体系列名称。
        'font-family-no-duplicate-names': true,
        // 禁止calc函数内的未空格运算符
        'function-calc-no-unspaced-operator': true,
        // 禁止!important在关键帧声明中。
        'keyframe-declaration-no-important': true,
        // 禁止未知的媒体功能名称。
        'media-feature-name-no-unknown': true,
        // 不允许选择具有较低特异性的选择子来覆盖更高特异性的选择者。
        'no-descending-specificity': true,
        // 禁止重复选择器
        'no-duplicate-selectors': true,
        // 禁止空来源
        'no-empty-source': true,
        // 禁止使用额外的分号（Autofixable）。
        'no-extra-semicolons': true,
        // 禁止//...CSS不支持双斜杠注释（）。
        'no-invalid-double-slash-comments': true,
        // 禁止未知属性。
        'property-no-unknown': true,
        // 禁止未知的伪类选择器。
        'selector-pseudo-class-no-unknown': true,
        // 禁止未知的伪元素选择器。
        'selector-pseudo-element-no-unknown': true,
        // 禁止未知类型选择器。
        'selector-type-no-unknown': true,
        // 禁止未知单位
        'unit-no-unknown': true,
        // 在at-rules之前要求或禁止空行（Autofixable）。
        'at-rule-empty-line-before': [
            'always',
            {
                'except': [
                    'blockless-after-same-name-blockless',
                    'first-nested'
                ],
                'ignore': [
                    'after-comment'
                ]
            }
        ],
        // 为at-rules名称指定小写或大写（Autofixable）。
        'at-rule-name-case': 'lower',
        // 在规则名称后面需要一个空格（Autofixable）。
        'at-rule-name-space-after': 'always-single-line',
        // 在at-rules分号后面需要换行符（Autofixable）。
        'at-rule-semicolon-newline-after': 'always',
        // 在块的右大括号（Autofixable）之前需要或禁止空行
        // (不允许关闭括号前空一行(stylelint-config-standard))
        'block-closing-brace-empty-line-before': 'never',
        // 在块的右大括号（Autofixable）之后需要换行符或禁止空格(需要一个换行符关闭括号后的空白)
        'block-closing-brace-newline-after': 'always',
        // 在块的右大括号（Autofixable）之前需要换行符或禁止空格。
        'block-closing-brace-newline-before': 'always-multi-line',
        // 在块的右大括号（自动修复）之前需要单个空格或禁止空格。
        'block-closing-brace-space-before': 'always-single-line',
        // 在打开大括号块（Autofixable）后需要换行符。 ( 开括号的块之后需要新的一行)
        'block-opening-brace-newline-after': 'always-multi-line',
        // 需要一个空格或在块的左大括号（Autofixable）后禁止空格。
        'block-opening-brace-space-after': 'always-single-line',
        // 在开始的块大括号（Autofixable）之前需要单个空格或禁止空格。
        'block-opening-brace-space-before': 'always',
        // 为十六进制颜色指定小写或大写（自动固定）。
        'color-hex-case': 'lower',
        // 为十六进制颜色指定短或长符号（自动固定）
        'color-hex-length': 'short',
        // 在注释（Autofixable）之前要求或禁止空行。
        'comment-empty-line-before': [
            'always',
            {
                'except': [
                    'first-nested'
                ],
                'ignore': [
                    'stylelint-commands'
                ]
            }
        ],
        // 要求或禁止评论标记（Autofixable）内部的空格。
        'comment-whitespace-inside': null,
        // 在自定义属性（Autofixable）之前需要或禁止空行。
        'custom-property-empty-line-before': [
            'always',
            {
                'except': [
                    'after-custom-property',
                    'first-nested'
                ],
                'ignore': [
                    'after-comment',
                    'inside-single-line-block'
                ]
            }
        ],
        // 声明爆炸后需要一个空格或不允许空格（Autofixable）。
        'declaration-bang-space-after': 'never',
        // 在声明爆炸（Autofixable）之前需要单个空格或禁止空格。
        'declaration-bang-space-before': 'always',
        // 在声明块的分号（Autofixable）后需要换行符或禁止空格
        'declaration-block-semicolon-newline-after': 'always-multi-line',
        // 在声明块的分号（Autofixable）后需要单个空格或禁止空格。
        'declaration-block-semicolon-space-after': 'always-single-line',
        // 在声明块的分号（Autofixable）之前需要单个空格或禁止空格。
        'declaration-block-semicolon-space-before': 'never',
        // 限制单行声明块中的声明数。
        'declaration-block-single-line-max-declarations': 1,
        // 在声明块（Autofixable）中要求或禁止使用尾随分号。
        'declaration-block-trailing-semicolon': 'always',
        // 在声明冒号（Autofixable）后需要换行符或禁止空格。
        'declaration-colon-newline-after': 'always-multi-line',
        // 声明冒号（Autofixable）后需要单个空格或禁止空格。
        'declaration-colon-space-after': 'always-single-line',
        // 在声明冒号（Autofixable）之前需要单个空格或禁止空格。
        'declaration-colon-space-before': 'never',
        // 声明前需要或禁止空行（Autofixable）。
        'declaration-empty-line-before': [
            'always',
            {
                'except': [
                    'after-declaration',
                    'first-nested'
                ],
                'ignore': [
                    'after-comment',
                    'inside-single-line-block'
                ]
            }
        ],
        // 在函数逗号后面需要换行符或禁止空格（Autofixable）。
        'function-comma-newline-after': 'always-multi-line',
        // 需要单个空格或在函数逗号后禁用空格（自动固定）。
        'function-comma-space-after': 'always-single-line',
        // 在函数逗号（Autofixable）之前需要单个空格或禁止空格。
        'function-comma-space-before': 'never',
        // 限制函数内的相邻空行数（自动固定）。
        'function-max-empty-lines': 0,
        // 为函数名称指定小写或大写（Autofixable）。
        'function-name-case': 'lower',
        // 需要换行符或禁止函数括号内部的空格（Autofixable）。
        'function-parentheses-newline-inside': 'always-multi-line',
        // 需要单个空格或禁止函数括号内部的空格（Autofixable）。
        'function-parentheses-space-inside': 'never-single-line',
        // 在函数（Autofixable）之后需要或禁止空格。
        'function-whitespace-after': 'always',
        // 字体系列中命名时带引号
        'font-family-name-quotes': 'always-where-recommended',
        // 指定缩进（Autofixable）。
        'indentation': 4,
        // 禁止零长度的单位（自动固定）
        'length-zero-no-unit': true,
        // 限制相邻空行的数量
        'max-empty-lines': 1,
        // 在媒体要素（自动固定）中冒号后需要单个空格或禁止空格。
        'media-feature-colon-space-after': 'always',
        // 在媒体要素（自动固定）中冒号前需要单个空格或禁止空格。
        'media-feature-colon-space-before': 'never',
        // 为媒体功能名称指定小写或大写（自动固定）。
        'media-feature-name-case': 'lower',
        // 需要单个空格或禁止媒体功能（自动修复）中括号内侧的空格。
        'media-feature-parentheses-space-inside': 'never',
        // 在媒体功能（自动修复）中的范围运算符后，需要单个空格或禁止空格。
        'media-feature-range-operator-space-after': 'always',
        // 在媒体功能（自动修复）中的范围运算符之前需要单个空格或禁止空格。
        'media-feature-range-operator-space-before': 'always',
        // 在媒体查询列表（Autofixable）的逗号后面需要换行符或禁止空格。
        'media-query-list-comma-newline-after': 'always-multi-line',
        // 在媒体查询列表（Autofixable）的逗号后面需要单个空格或禁止空格。
        'media-query-list-comma-space-after': 'always-single-line',
        // 在媒体查询列表（Autofixable）的逗号之前需要单个空格或禁止空格。
        'media-query-list-comma-space-before': 'never',
        // 禁止行尾空格（Autofixable）。
        'no-eol-whitespace': true,
        // 禁止（未转义）字符串中的换行符。
        'string-no-newline': false,
        // 禁止缺少源代码换行符（Autofixable）。
        'no-missing-end-of-source-newline': true,
        // 要求或禁止小于1的小数的前导零（自动固定）。
        'number-leading-zero': 'always',
        // 禁止数字尾随零（自动固定）。
        'number-no-trailing-zeros': true,
        // 为属性指定小写或大写（Autofixable）。
        'property-case': 'lower',
        // 在规则之前要求或禁止空行（Autofixable）。
        'rule-empty-line-before': [
            'always-multi-line',
            {
                'except': [
                    'first-nested'
                ],
                'ignore': [
                    'after-comment'
                ]
            }
        ],
        // 在属性选择器（Autofixable）中需要单个空格或禁止括号内部的空格。
        'selector-attribute-brackets-space-inside': 'never',
        // 在属性选择器（Autofixable）中的运算符之后需要单个空格或禁止空格。
        'selector-attribute-operator-space-after': 'never',
        // 在属性选择器（Autofixable）中的运算符之前需要单个空格或禁止空格。
        'selector-attribute-operator-space-before': 'never',
        // 在选择器的组合器（Autofixable）之后需要单个空格或禁止空格。
        'selector-combinator-space-after': 'always',
        // 在选择器的组合器（Autofixable）之前需要单个空格或禁止空格。
        'selector-combinator-space-before': 'always',
        // 禁止选择器的后代组合器（自动固定）的非空格字符。
        'selector-descendant-combinator-no-non-space': true,
        // 在选择器列表的逗号（Autofixable）之后需要换行符或禁止空格。
        // https://github.com/stylelint/stylelint/blob/master/lib/rules/selector-list-comma-newline-after/README.md
        'selector-list-comma-newline-after': 'always-multi-line',
        // 在选择器列表的逗号（Autofixable）之前需要单个空格或禁止空格。
        'selector-list-comma-space-before': 'never',
        // 限制选择器中相邻空行的数量。
        'selector-max-empty-lines': 0,
        // 为伪类选择器指定小写或大写（Autofixable）。
        'selector-pseudo-class-case': 'lower',
        // 需要单个空格或禁止伪类选择器（Autofixable）中括号内部的空格。
        'selector-pseudo-class-parentheses-space-inside': 'never',
        // 为伪元素选择器指定小写或大写
        'selector-pseudo-element-case': 'lower',
        // 为适用的伪元素（Autofixable）指定单冒号或双冒号表示法。
        'selector-pseudo-element-colon-notation': 'double',
        // 为类型选择器指定小写或大写（Autofixable）。
        'selector-type-case': 'lower',
        // 为单位指定小写或大写（自动固定）。
        'unit-case': 'lower',
        // 在值列表的逗号（Autofixable）之后需要换行符或禁止空格。
        // 在值列表的逗号后(指定一个换行符或禁止留有空格)
        'value-list-comma-newline-after': 'always-multi-line',
        // 需要单个空格或在值列表的逗号（Autofixable）后禁用空格。
        'value-list-comma-space-after': 'always-single-line',
        // 在值列表的逗号（Autofixable）之前需要单个空格或禁止空格。
        'value-list-comma-space-before': 'never',
        // 限制值列表中相邻空行的数量（自动固定）。
        'value-list-max-empty-lines': 0,
        // 指定声明块内的内容顺序
        // 此规则貌似没有声明，所以暂时取消
        //  20190402-wuwg
        'order/order': [
            ['custom-properties', 'declarations'], {
                'disableFix': true
            }
        ],
        // 指定声明块内属性的字母顺序
        'order/properties-order': [
            'content',
            'position',
            'top',
            'right',
            'bottom',
            'left',
            'z-index',
            'display',
            'visibility',
            'float',
            'clear',

            'columns',
            'columns-width',
            'columns-count',
            'column-rule',
            'column-rule-width',
            'column-rule-style',
            'column-rule-color',
            'column-fill',
            'column-span',
            'column-gap',

            'grid',
            'grid-template-rows',
            'grid-template-columns',
            'grid-template-areas',
            'grid-auto-rows',
            'grid-auto-columns',
            'grid-auto-flow',
            'grid-column-gap',
            'grid-row-gap',
            'grid-template',
            'grid-template-rows',
            'grid-template-columns',
            'grid-template-areas',
            'grid-gap',
            'grid-row-gap',
            'grid-column-gap',
            'grid-area',
            'grid-row-start',
            'grid-row-end',
            'grid-column-start',
            'grid-column-end',
            'grid-column',
            'grid-column-start',
            'grid-column-end',
            'grid-row',
            'grid-row-start',
            'grid-row-end',

            'flex',
            'flex-grow',
            'flex-shrink',
            'flex-basis',
            'flex-flow',
            'flex-direction',
            'flex-wrap',
            'justify-content',
            'align-content',
            'align-items',
            'align-self',
            'order',

            'table-layout',
            'empty-cells',
            'caption-side',

            'box-sizing',

            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',

            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',

            'width',
            'height',
            'max-width',
            'max-height',
            'min-width',
            'min-height',
            'margin-collapse',
            'margin-top-collapse',
            'margin-right-collapse',
            'margin-bottom-collapse',
            'margin-left-collapse',

            'overflow',
            'overflow-x',
            'overflow-y',

            'clip',

            'color',

            'font',

            'font-size',
            'font-family',
            'font-style',
            'font-variant',
            'font-weight',
            'font-stretch',
            'font-synthesis',
            'font-size-adjust',
            'font-kerning',
            'font-smoothing',
            'osx-font-smoothing',
            'font-feature-settings',
            'font-language-override',

            'src',
            'line-height',

            'text-align',
            'text-align-last',
            'text-indent',
            'text-overflow',
            'text-justify',
            'text-transform',
            'text-emphasis',
            'text-emphasis-style',
            'text-emphasis-color',
            'text-emphasis-position',
            'text-decoration',
            'text-decoration-color',
            'text-decoration-style',
            'text-decoration-line',
            'text-underline-position',
            'text-shadow',
            'text-rendering',
            'text-size-adjust',

            'vertical-align',
            'white-space',
            'overflow-wrap',
            'word-spacing',
            'word-wrap',
            'word-break',
            'line-break',
            'hyphens',
            'letter-spacing',
            'quotes',
            'tab-size',
            'orphans',
            'writing-mode',
            'text-combine-upright',
            'text-orientation',,

            'list-style',
            'list-style-type',
            'list-style-position',
            'list-style-image',

            'ruby-align',
            'ruby-merge',
            'ruby-position',
            'image-rendering',
            'image-orientation',
            'image-resolution',
            'shape-image-threshold',
            'shape-outside',
            'shape-margin',

            'border-radius',
            'border-top-right-radius',
            'border-bottom-right-radius',
            'border-bottom-left-radius',
            'border-top-left-radius',
            'border-radius-topright',
            'border-radius-bottomright',
            'border-radius-bottomleft',
            'border-radius-topleft',

            'border',
            'border-collapse',
            'border-spacing',

            'border-top',
            'border-right',
            'border-bottom',
            'border-left',

            'border-image',
            'border-image-source',
            'border-image-slice',
            'border-image-width',
            'border-image-outset',
            'border-image-repeat',

            'border-color',
            'border-top-color',
            'border-right-color',
            'border-bottom-color',
            'border-left-color',

            'border-style',
            'border-top-style',
            'border-right-style',
            'border-bottom-style',
            'border-left-style',

            'border-width',
            'border-top-width',
            'border-right-width',
            'border-bottom-width',
            'border-left-width',


            'outline',
            'outline-width',
            'outline-color',
            'outline-style',
            'outline-offset',

            'box-shadow',

            'background',
            'background-attachment',
            'background-color',
            'background-image',
            'background-position',
            'background-repeat',
            'background-size',
            'background-clip',
            'background-origin',
            'background-blend-mode',

            'isolation',
            'clip-path',
            'mask',
            'mask-image',
            'mask-mode',
            'mask-position',
            'mask-size',
            'mask-repeat',
            'mask-origin',
            'mask-clip',
            'mask-composite',
            'mask-type',

            'opacity',
            'filter',

            'size',
            'zoom',
            'box-align',
            'box-flex',
            'box-orient',
            'box-pack',

            'perspective',
            'perspective-origin',
            'backface-visibility',

            'transform',
            'transform-box',
            'transform-origin',
            'transform-style',

            'transition',
            'transition-delay',
            'transition-duration',
            'transition-property',
            'transition-timing-function',

            'animation',
            'animation-delay',
            'animation-duration',
            'animation-iteration-count',
            'animation-name',
            'animation-play-state',
            'animation-timing-function',
            'animation-fill-mode',

            'resize',
            'pointer-events',
            'cursor',
            'user-select',

            'scroll-behavior',
            'scroll-snap-type',
            'scroll-snap-destination',
            'scroll-snap-coordinate',

            'touch-action',
            'caret-color',
            'ime-mode',
            'object-fit',
            'object-position',

            'counter-reset',
            'counter-increment',
            'will-change',

            'all',
            'page-break-before',
            'page-break-after',
            'page-break-inside',
            'widows',

            'appearance',
            'interpolation-mode',
            'direction',
            'marks',
            'page',
            'set-link-source',
            'unicode-bidi',
            'speak'
        ]
    }
};

console.log(b);
// 比较的文章 https://www.jianshu.com/p/8a33aa5e34b5 
// 官方规则 https://github.com/stylelint/stylelint/blob/master/lib/rules/selector-list-comma-newline-after/README.md