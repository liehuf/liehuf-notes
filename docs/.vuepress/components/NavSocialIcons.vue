<template>
  <div class="nav-social-icons">
    <!-- B站二维码 -->
    <div class="social-item" @mouseenter="showQR('bilibili')" @mouseleave="hideQR('bilibili')">
      <svg class="social-icon bilibili" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path d="M306.005333 117.632L444.330667 256h135.296l138.282666-138.325333a42.666667 42.666667 0 0 1 60.373334 60.373333L672.298667 284.032C750.592 302.08 810.666667 372.394667 810.666667 456.533333v341.333334c0 94.208-76.458667 170.666667-170.666667 170.666666H384c-94.208 0-170.666667-76.458667-170.666667-170.666666V456.533333c0-84.138667 60.074667-154.453333 138.368-172.501333L245.632 177.962667a42.666667 42.666667 0 0 1 60.373333-60.330667zM384 341.333333c-63.573333 0-115.2 51.626667-115.2 115.2v341.333334c0 32.554667 26.368 58.922667 58.922667 58.922666H640c32.554667 0 58.922667-26.368 58.922667-58.922666V456.533333c0-63.573333-51.626667-115.2-115.2-115.2H384z m213.333333 213.333334a42.666667 42.666667 0 0 1 0 85.333333h-170.666666a42.666667 42.666667 0 1 1 0-85.333333h170.666666z"/>
      </svg>
      <div v-show="qrVisible.bilibili" class="qr-dropdown">
        <img src="/img/bilibili-qr.png" alt="B站二维码" />
        <p>关注我的B站</p>
      </div>
    </div>

    <!-- 微信公众号二维码 -->
    <div class="social-item" @mouseenter="showQR('wechat')" @mouseleave="hideQR('wechat')">
      <svg class="social-icon wechat" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path d="M690.1 377.4c5.9 0 11.8 0.2 17.6 0.5-15.8-73.3-84.3-128.4-165.3-128.4-90.4 0-165.7 60.7-165.7 137.5 0 44.5 24.2 80.5 60.4 108.8L418 539.2l21.4-10.7c24.1 4.4 42.1 10.7 60.4 10.7 5.3 0 10.6-0.3 15.8-0.7-3.3-11.4-5.2-23.4-5.2-35.8-0.1-76.8 62.5-125.3 179.7-125.3z m-165.8-78.9c14.5 0 24.2 9.7 24.2 24.2s-9.7 24.2-24.2 24.2c-14.5 0-24.2-9.7-24.2-24.2s9.7-24.2 24.2-24.2z m-96.8 48.4c-14.5 0-24.2-9.7-24.2-24.2s9.7-24.2 24.2-24.2 24.2 9.7 24.2 24.2-9.7 24.2-24.2 24.2z"/>
        <path d="M995.6 642.3c0-60.5-60.4-113.1-133.5-113.1-78.5 0-133.5 52.6-133.5 113.1 0 60.5 55 108.8 133.5 108.8 15.8 0 36.3-5.3 48.4-10.7l42.1 21.4-10.7-36.3c24.2-19.3 53.2-44.5 53.2-83.2z m-177.7-24.2c-9.7 0-19.3-9.7-19.3-19.3 0-9.7 9.7-19.3 19.3-19.3 9.7 0 19.3 9.7 19.3 19.3 0 9.7-9.6 19.3-19.3 19.3z m96.8 0c-9.7 0-19.3-9.7-19.3-19.3 0-9.7 9.7-19.3 19.3-19.3s19.3 9.7 19.3 19.3c0 9.7-9.6 19.3-19.3 19.3z"/>
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
  gap: 16px
  height: 100%

.social-item
  position: relative
  display: flex
  align-items: center
  height: 100%
  cursor: pointer

.social-icon
  width: 20px
  height: 20px
  transition: all 0.3s ease
  
  &.bilibili
    fill: #00a1d6
    
  &.wechat
    fill: #1aad19

.social-item:hover .social-icon
  transform: scale(1.1)

.qr-dropdown
  position: absolute
  top: 100%
  right: 0
  background: white
  border: 1px solid #eaecef
  border-radius: 8px
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1)
  padding: 16px
  text-align: center
  white-space: nowrap
  z-index: 1000
  animation: fadeInDown 0.3s ease
  
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
    transform: translateY(-10px)
  to
    opacity: 1
    transform: translateY(0)

// 移动端适配
@media (max-width: 768px)
  .nav-social-icons
    gap: 12px
    
  .social-icon
    width: 18px
    height: 18px
    
  .qr-dropdown
    right: -20px
    padding: 12px
    
    img
      width: 100px
      height: 100px
</style>