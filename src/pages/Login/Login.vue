<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">网上书城</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">注册</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="email" maxlength="20" placeholder="邮箱" v-model="z_email">
            </section>
            <section class="login_verification">
              <input type="text" maxlength="10" placeholder="用户名" v-model="z_user">
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="11" placeholder="电话" v-model="z_tel">
            </section>
            <section class="login_verification">
              <input type="password" maxlength="16" placeholder="密码" v-model="z_pass">
            </section>
            <section class="login_verification">
              <input type="text" maxlength="10" placeholder="真实姓名" v-model="z_name">
            </section>
            <section class="login_verification">
              <input type="text" maxlength="8" placeholder="性别" v-model="z_sex">
            </section>
            <section class="login_hint">
              温馨提示：未注册网上书店帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="20" placeholder="邮箱" v-model="email">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="password">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="password">
                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : '...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="verCode">
                <img class="get_verification" src="http://localhost:8088/bookstore/user/verCode" alt="verCode"
                  @click="getVerCode" ref="verCode">
              </section>
            </section>
          </div>
          <button class="login_submit">登陆</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </section>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip.vue'
  import {reqSendCode, reqRegLogin, reqPwdLogin} from '../../api'
  export default {
    data () {
      return {
        loginWay: false, // true代表注册, false代表密码
        computeTime: 0, // 计时的时间
        showPwd: false, // 是否显示密码
        phone: '', // 手机号
        code:'', // 短信验证码
        email: '', // 用户名
        password: '', // 密码
        verCode: '', // 图形验证码
        alertText: '', // 提示文本
        alertShow: false, // 是否显示警告框
        // 注册的部分
        z_email: '',
        z_user: '',
        z_tel: '',
        z_pass: '',
        z_name: '',
        z_sex: ''
      }
    },

    computed: {
      rightPhone () {
        return /^1\d{10}$/.test(this.phone)
      }
    },

    methods: {
      // 异步获取短信验证码
      async getCode () {
        // 如果当前没有计时
        if(!this.computeTime) {
          // 启动倒计时
          this.computeTime = 30
          this.intervalId = setInterval(() => {
            this.computeTime--
            if(this.computeTime<=0) {
              // 停止计时
              clearInterval(this.intervalId)
            }
          }, 1000)

          // 发送ajax请求(向指定手机号发送验证码短信)
          const result = await reqSendCode(this.phone)
          if(result.code===1) {
            // 显示提示
            this.showAlert(result.msg)
            // 停止计时
            if(this.computeTime) {
              this.computeTime = 0
              clearInterval(this.intervalId)
              this.intervalId = undefined
            }
          }
        }

      },

      showAlert(alertText) {
        this.alertShow = true
        this.alertText = alertText
      },
      // 异步登陆
      async login () {
        if(!this.loginWay){
        let result
          const {email, password, verCode} = this
          // console.log('hahahhahahahahhahahha', email, 'jjjjjjjjjjjjj', password, ' jggjgghggg' , verCode)
          if(!this.email) {
            // 用户名必须指定
            this.showAlert('请输入邮箱!')
            return
          } else if(!this.password) {
            // 密码必须指定
            this.showAlert('请输入密码！')
            return
          } else if(!this.verCode) {
            // 验证码必须指定
            this.showAlert('请输入验证码！')
            return
          }
          // 发送ajax请求密码登陆
          result = await reqPwdLogin(email, password, verCode)
        // 停止计时
        if(this.computeTime) {
          this.computeTime = 0
          clearInterval(this.intervalId)
          this.intervalId = undefined
        }
        // 根据结果数据处理
        if(result.code===0) {
          const user = result.data
          // 将user保存到vuex的state
          this.$store.dispatch('recordUser', user)
          // 去个人中心界面
          this.$router.replace('/profile')
        } else {
          // 显示新的图片验证码
          this.getVerCode()
          // 显示警告提示
          const msg = result.msg
          this.showAlert(msg)
        }
      } else {    //注册的页面
        let result
          const {z_email, z_user, z_tel, z_pass, z_name, z_sex} = this
          if(!this.z_email) {
            // 用户名必须指定
            this.showAlert('请输入邮箱!')
            return
          }else if(!this.z_user) {
            // 密码必须指定
            this.showAlert('请输入用户名！')
            return
          } else if(!this.z_tel) {
            // 验证码必须指定
            this.showAlert('请输入电话！')
            return
          } else if(!this.z_pass) {
            this.showAlert('请输入密码')
            return
          } else if(!this.z_name) {
            this.showAlert('请输入真实姓名')
            return
          } else if(!this.z_sex) {
            this.showAlert('请输入性别')
            return
          }
          // 用ajsx传值进行注册，注册成功之后自动登陆
          result = await reqRegLogin(z_email, z_user, z_tel, z_pass, z_name, z_sex)

          // 根据结果数据处理
          if(result.code===0) {
            const user = result.data
            // 将user保存到vuex的state
            this.$store.dispatch('recordUser', user)
            // 去个人中心界面
            this.$router.replace('/profile')
          } else {
            // 显示警告提示
            const msg = result.msg
            this.showAlert(msg)
          }
      }
      },
      // 关闭警告框
      closeTip () {
        this.alertShow = false
        this.alertText = ''
      },
      // 获取一个新的图片验证码
      getVerCode () {
        // 每次指定的src要不一样
        this.$refs.verCode.src = 'http://localhost:8088/bookstore/user/verCode?time='+Date.now()
      }
    },

    components: {
      AlertTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
