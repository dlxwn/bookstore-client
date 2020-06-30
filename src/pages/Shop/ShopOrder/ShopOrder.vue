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
    <mt-cell title="商品单价(元):" v-model=bookinfo.price></mt-cell>
    <mt-cell title="商品数量(本):">
      <input style="width: 50px; height: 100%;" v-model="num" />
    </mt-cell>
    <mt-cell title="应付金额(元):">{{amount * bookinfo.price}}</mt-cell>
    <mt-button type="primary" size="large" @click="submitOrder(userInfo,bookinfo)">提交订单</mt-button>
    </section>
      </div>
    </div>
  </div>

</template>

<script>
  import AlertTip from '../../../components/AlertTip/AlertTip.vue'
  import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../../api'
  import {mapState} from 'vuex'
  import {sendOrderList} from '../../../api'
  import BScroll from 'better-scroll'
  export default {
    name: 'ShopOrder',
    data(){
      return {
        username: '',
        address: '',
        phone: '',
        num: '10',
        userState: '',
        addressState: '',
        telState: ''
      }
    },
    computed: {
      ...mapState(['info','bookinfo','userInfo']),
      amount: function(bookinfo){
        return this.num;
      }
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
    mounted() {
      this._initScroll()
    },
    methods:{
      _initScroll () {
        new BScroll('.shop-info')
        // 动态计算ul的宽度
        const ul = this.$refs.picsUl
        const liWidth = 120
        const space = 6
        const count = this.info.pics.length
        ul.style.width = (liWidth + space) * count -space + 'px'
      },
      async submitOrder(userInfo,bookinfo) {
        if(this.userState == 'success' && this.addressState == 'success' && this.telState == 'success'){
          //表单正确发送请求
          var orderlist = {
            "userId" : userInfo.userId,
            "amount": this.amount*bookinfo.price,
            "orderName": this.username,
            "orderTel": this.phone,
            "orderAddress": this.address,
            "orderDate": Date.now()
          }
          let result = await sendOrderList(orderlist)
          if (result.code === 0){
            alert("提交成功")
          } else{
            alert("提交失败")
          }

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
