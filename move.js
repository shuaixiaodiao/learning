        // 同步运动
        // 涉及 对象
        /**
         * move_online() 运动框架-css2
         * @param  {[Object]}   obj      [操作对象]
         * @param  {[Object]}   attr_obj [属性集]
         * @param  {Function} fn       [回调函数-链式操作]
         * @return {[undefined]}            [无返回值]
         */
        function move_online(obj, attr_obj, fn) 
        {  
            // 用于判断属性是否全部执行完毕
            var bool = true;
            clearInterval(obj.timer);
   
            // 给对象赋值 -- 定时器
            obj.timer = setInterval(function () {
                for(var arr in attr_obj)
                {

                    var iattr = 0;
                    // 判断是否特殊属性
                    if(arr == 'opacity'){
                        // 当属性不是整数时
                        var iattr = parseFloat(getStyle(obj, arr))*100;
                    }else{
                        var iattr = parseInt(getStyle(obj, arr));
                    }
                    var v = (attr_obj[arr] - iattr) / 8;
                    v = v > 0 ? Math.ceil(v) : Math.floor(v);


                    // 判断参数是否都达到目标值
                    // 若是多个属性，则要保证全部达到目标值才停止
                    if(iattr != attr_obj[arr]){
                        bool = false;
                        move_online(obj, attr_obj, fn);
                    }

                    // 若所有属性值都等于目标值
                    if(bool){
                        clearInterval(obj.timer);
                        if(fn){
                            fn();
                        }
                    }
                    // 改属性
                    if(arr == 'opacity')
                    {
                        // 兼容IE
                        obj.style.filter = 'alpha(opacity: '+ (iattr + v) +')';
                        
                        obj.style.opacity = Math.round(iattr + v)/100;
                    }else{
                        // 把参数写入对象属性
                        obj.style[ arr ] = iattr + v + 'px';
                    }

                }
            }, 30);


        }

         // 获取对象属性
            // 火狐兼容 omg
            /**
             * getStyle() 获取属性值
             * @param  {[Object]} obj       [获取对象]
             * @param  {[string]} style_str [属性名]
             * @return {[string]}           [属性值]
             */
            function getStyle(obj, style_str) 
            {
                if(obj.currentStyle)
                {
                    // 兼容IE
                    return obj.currentStyle[style_str];
                }else
                {
                    // 获取属性
                    return getComputedStyle(obj,false)[style_str];
                }
            }