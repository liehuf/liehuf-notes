<template>
  <div class="floating-social-icons">
    <!-- B站图标 -->
    <div class="social-item" @mouseenter="showQR('bilibili')" @mouseleave="hideQR('bilibili')">
      <svg class="social-icon bilibili" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <!-- 经典B站小电视图标，高辨识度 -->
        <path d="M6.5 4.5C5.7 4.5 5 5.2 5 6v12c0 .8.7 1.5 1.5 1.5h11c.8 0 1.5-.7 1.5-1.5V6c0-.8-.7-1.5-1.5-1.5h-11z" fill="currentColor"/>
        <!-- 小电视屏幕 -->
        <rect x="7" y="7" width="10" height="6" rx="1" fill="white"/>
        <!-- 经典B站logo的双眼 -->
        <circle cx="9.5" cy="9.5" r="0.8" fill="#00a1d6"/>
        <circle cx="14.5" cy="9.5" r="0.8" fill="#00a1d6"/>
        <!-- 嘴巴 -->
        <path d="M10.5 11.5c1 0 2 .5 2.5 1h-5c.5-.5 1.5-1 2.5-1z" fill="#00a1d6"/>
        <!-- 小耳朵天线 -->
        <circle cx="8" cy="3" r="1" fill="currentColor"/>
        <circle cx="16" cy="3" r="1" fill="currentColor"/>
        <path d="M8 4V3M16 4V3" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
        <!-- 底部按钮 -->
        <circle cx="9" cy="16" r="1" fill="white"/>
        <circle cx="15" cy="16" r="1" fill="white"/>
      </svg>
      <div v-show="qrVisible.bilibili" class="qr-dropdown">
        <img src="/img/bilibili-qr.png" alt="B站二维码" />
        <p>关注我的B站</p>
      </div>
    </div>

    <!-- 微信公众号图标 -->
    <div class="social-item" @mouseenter="showQR('wechat')" @mouseleave="hideQR('wechat')">
      <svg class="social-icon wechat" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <!-- 经典微信双气泡图标，高辨识度 -->
        <!-- 大气泡 -->
        <path d="M8.5 5C5.5 5 3 7.2 3 10c0 1.5.7 2.8 2 3.7L4.5 16l2.3-1.2c.6.2 1.2.2 1.8.2.2 0 .4 0 .6-.1-.1-.4-.2-.8-.2-1.2 0-2.8 2.5-5 5.5-5 .2 0 .4 0 .6.1C14.5 6.7 11.8 5 8.5 5z" fill="currentColor"/>
        <!-- 大气泡眼睛 -->
        <circle cx="6.5" cy="9.5" r="0.8" fill="white"/>
        <circle cx="10.5" cy="9.5" r="0.8" fill="white"/>
        <!-- 小气泡 -->
        <path d="M14.5 9.5c-2.5 0-4.5 1.7-4.5 3.8s2 3.8 4.5 3.8c.5 0 1-.1 1.4-.3L17.5 18l-.4-1.2c1-.7 1.6-1.7 1.6-2.8 0-2.1-2-3.8-4.5-3.8z" fill="currentColor"/>
        <!-- 小气泡眼睛 -->
        <circle cx="13" cy="12.5" r="0.5" fill="white"/>
        <circle cx="16" cy="12.5" r="0.5" fill="white"/>
      </svg>
      <div v-show="qrVisible.wechat" class="qr-dropdown">
        <img src="/img/wechat-qr.png" alt="微信公众号二维码" />
        <p>关注我的公众号</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FloatingSocialIcons',
  data() {
    return {
      qrVisible: {
        bilibili: false,
        wechat: false
      }
    }
  },
  methods: {
    showQR(type) {
      this.qrVisible[type] = true
    },
    hideQR(type) {
      this.qrVisible[type] = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.floating-social-icons
  position: fixed
  bottom: 180px  // 在主题模式切换按钮上方，保持间距
  right: 20px    // 与主题按钮保持相同的右边距
  z-index: 1000
  display: flex
  flex-direction: column
  gap: 15px      // 与主题按钮间距保持一致

.social-item
  position: relative
  width: 40px    // 与主题按钮大小一致
  height: 40px   // 与主题按钮大小一致
  background: rgba(255, 255, 255, 0.9)
  border-radius: 50%
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15)
  transition: all 0.3s ease
  backdrop-filter: blur(10px)
  border: 1px solid rgba(255, 255, 255, 0.2)

  &:hover
    transform: scale(1.1)
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25)

.social-icon
  width: 22px    // 稍微调小图标尺寸，适配40px容器
  height: 22px
  transition: all 0.3s ease
  
  &.bilibili
    color: #00a1d6
    
  &.wechat
    color: #1aad19

.qr-dropdown
  position: absolute
  bottom: 0
  right: 60px
  background: white
  border: 1px solid #eaecef
  border-radius: 8px
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15)
  padding: 16px
  text-align: center
  white-space: nowrap
  animation: slideInLeft 0.3s ease
  
  &::before
    content: ''
    position: absolute
    top: 50%
    right: -6px
    transform: translateY(-50%)
    width: 0
    height: 0
    border-top: 6px solid transparent
    border-bottom: 6px solid transparent
    border-left: 6px solid white
  
  img
    width: 120px
    height: 120px
    border-radius: 4px
    margin-bottom: 8px
    display: block
    
  p
    margin: 0
    font-size: 12px
    color: #666
    font-weight: 500

@keyframes slideInLeft
  from
    opacity: 0
    transform: translateX(20px)
  to
    opacity: 1
    transform: translateX(0)

// 移动端适配
@media (max-width: 768px)
  .floating-social-icons
    bottom: 160px  // 保持与桌面端相同的布局逻辑
    right: 15px
    gap: 12px      // 稍微减小间距适配移动端
    
  .social-item
    width: 36px    // 稍微减小尺寸适配移动端
    height: 36px
    
    .social-icon
      width: 20px
      height: 20px
      
  .qr-dropdown
    right: 46px    // 调整二维码位置适配新的按钮尺寸
    padding: 12px
    
    img
      width: 100px
      height: 100px
      
    p
      font-size: 11px

// 在特别小的屏幕上调整位置
@media (max-width: 480px)
  .floating-social-icons
    bottom: 140px
    right: 10px
    
  .social-item
    width: 32px
    height: 32px
    
    .social-icon
      width: 18px
      height: 18px
      
  .qr-dropdown
    right: 42px
    padding: 10px
    
    img
      width: 80px
      height: 80px
</style>