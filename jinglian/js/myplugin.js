(function (){
    const MyPlugin = {}
    MyPlugin.install = function (){
        //1. 添加全局方法或属性
        Vue.myGlobalMethod = function () {
            alert('全局方法myGlobalMethod被调用了')
        }
        //2. 添加全局指令
        Vue.directive('my-directive', {
            inserted (el, binding) {
                el.innerHTML = "MyPlugin.my-directive指令被调用了"+binding.value
            }
        })
        //3. 添加示例方法 new Vue
        Vue.prototype.$myMethod = function (value){
            alert('Vue 示例方法myMethod被调用了：'+value)
        }
        //将插件添加 到 window对象
        window.MyPlugin = MyPlugin
    }
})()

/**使用
 * 视频地址：https://ke.qq.com/webcourse/index.html#cid=466900&term_id=100558789&taid=4837374421311444&vid=5285890796241105603
1. 引入
<script src="node_modules/js/myplugin.js"></script>
2. 使用
<script>
    Vue.use(MyPlugin)
    var vm = new Vue({
        el:'#app',
        data: {
            content: 'hello'
        }
    }) 
    //调用属性方法
    vm.$myMethod('test')
    //调用全局方法
    Vue.myGlobalMethod()
</script>
*/
