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
        
        // 查找导航栏链接容器
        const navLinks = document.querySelector('.navbar .nav-links')
        
        if (navLinks) {
          // 查找所有导航链接
          const links = navLinks.querySelectorAll('.nav-link')
          
          // 找到"首页"链接（通常是第一个）和"Verilog"链接
          let homeLink = null
          let verilogLink = null
          
          links.forEach(link => {
            const text = link.textContent.trim()
            if (text === '首页') {
              homeLink = link
            } else if (text === 'Verilog') {
              verilogLink = link
            }
          })
          
          // 如果找到了"首页"和"Verilog"链接，则在它们之间插入社交图标
          if (homeLink && verilogLink) {
            // 创建容器
            const socialContainer = document.createElement('div')
            socialContainer.className = 'nav-social-container'
            socialContainer.style.display = 'flex'
            socialContainer.style.alignItems = 'center'
            socialContainer.style.margin = '0 10px'
            
            // 创建Vue组件实例
            const NavSocialConstructor = Vue.extend(NavSocialIcons)
            const instance = new NavSocialConstructor()
            instance.$mount()
            
            // 添加到容器
            socialContainer.appendChild(instance.$el)
            
            // 在"Verilog"链接之前插入社交图标
            verilogLink.parentNode.insertBefore(socialContainer, verilogLink)
          } else {
            // 降级方案：添加到导航栏右侧
            const navbarRight = document.querySelector('.navbar .links')
            if (navbarRight) {
              const socialContainer = document.createElement('div')
              socialContainer.className = 'nav-social-container'
              
              const NavSocialConstructor = Vue.extend(NavSocialIcons)
              const instance = new NavSocialConstructor()
              instance.$mount()
              
              socialContainer.appendChild(instance.$el)
              navbarRight.appendChild(socialContainer)
            }
          }
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
