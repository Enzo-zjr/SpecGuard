export default {
    data() {
        return {

            /**
             * @alias module:template~extendData2
             * @default 2
             * @description  @alias~生成template模块的扩展属性， ~优先级最低，会变成最后一个
             */
            extendData2: 2,

            /**
             * @alias module:template.extendData1
             * @default 1
             * @description  @alias.生成template模块的扩展属性， . 优先级最高，会变成第一个
             */
            extendData1: 1,

            /**
             * @alias module:template#extendData3
             * @default 3
             * @description  @alias#生成template模块的扩展属性
             */
            extendData3: 3,

            /**
             *  @private
             *  @static
             *  @constant
             *  @memberof module:template
             *  @description   @memberof 生成template模块的扩展属性，  @memberof 优先级第二高，会变成第二个
             */
            extendData5: 6
        };
    },
    methods: {

        /**
         * @function
         * @alias  module:template~extendMethod1
         * @description   @alias~生成template模块的方法， ~优先级最低，会变成最后一个
         * @return {undefined} 无返回值
         */
        extendMethod1: function () {
            window.console.log('extendMethod1');
        },

        /**
         * @function
         * @alias  module:template#extendMethod2
         * @description   @alias# 生成template模块的方法
         * @return {undefined} 无返回值
         */
        extendMethod2: function () {
            window.console.log('extendMethod2');
        },

        /**
         * test_runn2
         * @access private
         * @alias  module:template.extendMethod3
         * @description @alias.生成template模块的方法, . 优先级最高，会变成第一个
         * @return {undefined} 无返回值
         */
        extendMethod3: function () {
            window.console.log('extendMethod3');
        },

        /**
         * testEvent
         * @memberof module:template
         * @description @memberof 生成template模块的方法, . 优先级第二高，会变成第二个
         * @access private
         * @returns {undefined} 无返回值
         */
        extendMethod4: function () {
            window.console.log('extendMethod4');
        },

        /**
         * testEvent
         * @memberof module:template
         * @description @memberof 生成template模块的方法, @memberof 优先级第二高，会变成第二个
         * @access private
         * @returns {undefined} 无返回值
         */
        extendMethod5: function () {
            window.console.log('extendMethod5');

            /**
             * @event  module:template#getBall
             * @type {object}
             * @property {Object} ball - 球
             * @property {number}  ball.kinds       - 球有多少种.
             * @property {object}  ball.names         - 球的名称.
             * @property {string}  ball.names.basketball - 篮球.
             * @property {string}  ball.names.volleyball - 排球.
             * @property {string}  ball.names.football - 足球.
             */
            this.$emit('getBall', {
                ball: {
                    kinds: 3,
                    names: {
                        basketball: '篮球',
                        volleyball: '排球',
                        football: '足球'
                    }
                }
            });
        }
    }
};
