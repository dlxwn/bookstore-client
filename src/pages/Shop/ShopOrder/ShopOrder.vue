<template>
  <div>
    <div class="shop-info">
      <div class="info-content">
    <section class="section">
      <h3 class="section-title">配送信息</h3>
      <div class="delivery">
        <div>
          <span class="delivery-icon">{{info.description}}</span>
          <span>由店家配送提供配送，约{{info.deliveryTime}}天送达，距离{{info.distance}}</span>
        </div>
        <div class="delivery-money">配送费￥{{info.deliveryPrice}}</div>
      </div>
    </section>

    <section class="section">
    <br />
    <mt-field label="收货人姓名" placeholder="请输入姓名" v-model="username" :state="userState"></mt-field>
    <mt-field label="收件人地址" placeholder="请输入地址" v-model="address" :state="addressState"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone" :state="telState"></mt-field>
    <mt-cell title="商品数量(本):" v-model=num></mt-cell>
    <mt-cell title="应付金额(元):" v-model=amount></mt-cell>
    <mt-button type="primary" size="large" @click="submitOrder">提交订单</mt-button>
    </section>
      </div>
    </div>
  </div>

</template>

<script>
  import AlertTip from '../../../components/AlertTip/AlertTip.vue'
  import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../../api'
  import {mapState} from 'vuex'

  export default {
    name: 'ShopOrder',
    data(){
      return {
        data:'',
        username: '',
        address: '',
        phone: '',
        num: 12,
        amount: 123.5,
        userState: '',
        addressState: '',
        telState: ''
      }
    },
    computed: {
      ...mapState(['info'])
    },
    watch:{
       username(newVal,oldVal){
         if(newVal == '') this.userState = ''
         else this.userState = 'success'
       },
       address(newVal,oldVal){
         if(newVal == '') this.addressState = ''
         else this.addressState = 'success'
       },
       phone(newVal,oldVal){
         if(newVal == '') this.telState = ''
         else if(!/^1\d{10}$/.test(newVal)) this.telState = 'error'
         else this.telState = 'success'
       }
    },
    methods:{
      showAlert(alertText) {
        this.alertShow = true
        this.alertText = alertText
      },
      submitOrder() {
        if(this.userState == 'success' && this.addressState == 'success' && this.telState == 'success'){
          //表单正确发送请求

        }else{
          this.showAlert('请正确填写信息')
          if(this.userState != 'success') this.userState = 'error';
          if(this.addressState != 'success') this.addressState = 'error';
          if(this.telState != 'success') this.telState = 'error';
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .bold
    font-weight 700
    color #333
  &:last-child
    border-none()

  .shop-info
    position: absolute
    top: 195px
    bottom: 0
    left: 0
    width: 100%
    background: #fff;
    overflow: hidden
    .section
      padding 16px 14px 14px
      font-size 16px
      background-color #fff
      color #666
      border-bottom 1px solid #eee
      position relative
      .section-title
        color #000
        font-weight 700
        line-height 16px
        > .iconfont
          float right
          color #ccc
      .delivery
        margin-top 16px
        font-size 13px
        line-height 18px
        .delivery-icon
          width 55px
          font-size 11px
          margin-right 10px
          display inline-block
          text-align center
          color #fff
          background-color #0097ff
          padding 1px 0
          border-radius 4px
        .delivery-money
          margin-top 5px


    .split
      width: 100%
      height: 16px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7
</style>
