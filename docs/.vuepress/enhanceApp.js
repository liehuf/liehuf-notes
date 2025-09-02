// import vue from 'vue/dist/vue.esm.browser'
import FloatingSocialIcons from './components/FloatingSocialIcons.vue'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // window.Vue = vue // 使页面中可以使用Vue构造函数 （使页面中的vue demo生效）
  
  // 全局注册浮动社交图标组件
  Vue.component('FloatingSocialIcons', FloatingSocialIcons)
  
  // 在页面加载完成后添加浮动社交图标
  Vue.mixin({
    mounted() {
      if (typeof window !== 'undefined') {
        this.$nextTick(() => {
          this.addFloatingSocialIcons()
        })
      }
    },
    methods: {
      addFloatingSocialIcons() {
        // 避免重复添加
        if (document.querySelector('.floating-social-icons')) {
          return
        }
        
        // 创建浮动社交图标容器
        const floatingContainer = document.createElement('div')
        floatingContainer.id = 'floating-social-container'
        
        // 创建Vue组件实例
        const FloatingSocialConstructor = Vue.extend(FloatingSocialIcons)
        const instance = new FloatingSocialConstructor()
        instance.$mount()
        
        // 添加到容器
        floatingContainer.appendChild(instance.$el)
        
        // 添加到页面body
        document.body.appendChild(floatingContainer)
      }
    }
  })
}

// export default ({ router }) => {
//   router.beforeEach((to, from, next) => {
//     console.log("切换路由", to.fullPath, from.fullPath);

//     //触发百度的pv统计
//     if (typeof _hmt != "undefined") {
//       if (to.path) {
//         _hmt.push(["_trackPageview", to.fullPath]);
//         console.log("上报百度统计", to.fullPath);
//       }
//     }

//     // continue
//     next();
//   });
// };
