// import vue from 'vue/dist/vue.esm.browser'
import NavSocialIcons from './components/NavSocialIcons.vue'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // window.Vue = vue // 使页面中可以使用Vue构造函数 （使页面中的vue demo生效）
  
  // 全局注册导航栏社交图标组件
  Vue.component('NavSocialIcons', NavSocialIcons)
  
  // 在导航栏加载完成后添加社交图标
  Vue.mixin({
    mounted() {
      if (typeof window !== 'undefined') {
        this.$nextTick(() => {
          this.addNavSocialIcons()
        })
      }
    },
    methods: {
      addNavSocialIcons() {
        // 避免重复添加
        if (document.querySelector('.nav-social-icons')) {
          return
        }
        
        // 简化方案：先添加到导航栏右侧，确保基本功能正常
        const navbar = document.querySelector('.navbar .links') || 
                      document.querySelector('.navbar .nav-links')
        
        if (navbar) {
          // 创建容器
          const socialContainer = document.createElement('div')
          socialContainer.className = 'nav-social-container'
          
          // 创建Vue组件实例
          const NavSocialConstructor = Vue.extend(NavSocialIcons)
          const instance = new NavSocialConstructor()
          instance.$mount()
          
          // 添加到容器
          socialContainer.appendChild(instance.$el)
          
          // 添加到导航栏末尾
          navbar.appendChild(socialContainer)
        }
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
