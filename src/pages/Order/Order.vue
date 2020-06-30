<template>
  <section class="order">
    <HeaderTop title="订单列表"/>
    <section class="order_no_login" v-if="!userInfo.userId">
      <img src="./images/person.png">
      <h3>登录后查看外卖订单</h3>
      <button @click="to_login">立即登陆</button>
    </section>
    <section style="width: 100%; margin-top: 40px;" v-else>
      <mt-cell title="订单编号:" >01</mt-cell>
      <mt-cell title="购买物品:" >克隆版大脑</mt-cell>
      <mt-cell title="购买数量:" >10</mt-cell>
      <mt-cell title="购买单价(元):" >29.1</mt-cell>
      <mt-cell title="总价格(元):" >291</mt-cell>
      <p style="color: #6AC20B;">--------------------华丽的分割线--------------------</p>
      <mt-cell title="订单编号:" >02</mt-cell>
      <mt-cell title="购买物品:" >十万个为什么</mt-cell>
      <mt-cell title="购买数量:" >1</mt-cell>
      <mt-cell title="购买单价(元):" >33.1</mt-cell>
      <mt-cell title="总价格(元):" >33.1</mt-cell>
      <p style="color: #6AC20B;">--------------------华丽的分割线--------------------</p>
      <mt-cell title="订单编号:" >03</mt-cell>
      <mt-cell title="购买物品:" >一千零一夜</mt-cell>
      <mt-cell title="购买数量:" >2</mt-cell>
      <mt-cell title="购买单价(元):" >19.8</mt-cell>
      <mt-cell title="总价格(元):" >39.6</mt-cell>
      <br /><br /><br />
    </section>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState(['userInfo']),
    },
    components: {
      HeaderTop
    },
    methods: {
      to_login(){
        this.$router.replace('/login')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .order  //订单
    width 100%
    .header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .order_no_login
      padding-top 140px
      width 60%
      margin 0 auto
      text-align center
      >img
        display block
        width 100%
        height 30%
      >h3
        padding 10px 0
        font-size 17px
        color #6a6a6a
      >button
        display inline-block
        background #02a774
        font-size 14px
        color #fff
        border 0
        outline none
        border-radius 5px
        padding 10px 20px
</style>
