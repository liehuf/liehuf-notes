<template>
  <div class="nav-social-icons">
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
  name: 'NavSocialIcons',
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
.nav-social-icons
  display: flex
  align-items: center
  gap: 12px
  height: 100%

.social-item
  position: relative
  display: flex
  align-items: center
  height: 100%
  cursor: pointer
  padding: 0 6px

.social-icon
  width: 20px
  height: 20px
  transition: all 0.3s ease
  
  &.bilibili
    color: #00a1d6
    
  &.wechat
    color: #1aad19

.social-item:hover .social-icon
  transform: scale(1.1)

.qr-dropdown
  position: absolute
  top: 100%
  left: 50%
  transform: translateX(-50%)
  background: white
  border: 1px solid #eaecef
  border-radius: 8px
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1)
  padding: 16px
  text-align: center
  white-space: nowrap
  z-index: 1000
  animation: fadeInDown 0.3s ease
  margin-top: 10px
  
  &::before
    content: ''
    position: absolute
    top: -6px
    left: 50%
    transform: translateX(-50%)
    width: 0
    height: 0
    border-left: 6px solid transparent
    border-right: 6px solid transparent
    border-bottom: 6px solid white
  
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

@keyframes fadeInDown
  from
    opacity: 0
    transform: translateX(-50%) translateY(-10px)
  to
    opacity: 1
    transform: translateX(-50%) translateY(0)

// 移动端适配
@media (max-width: 768px)
  .nav-social-icons
    gap: 8px
    
  .social-item
    padding: 0 4px
    
    .social-icon
      width: 18px
      height: 18px
      
    .qr-dropdown
      padding: 12px
      
      img
        width: 100px
        height: 100px
</style>