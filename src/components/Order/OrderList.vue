<template>
  <div class="shop_container">
    <ul class="shop_list" v-if="orders.length">
      <li class="shop_li border-1px" v-for="(order, index) in orders"
          :key="index" @click="getOrderDetail(order.orderId)">
        <a>
          <!-- <div class="shop_left">
            <img class="shop_img" :src="book.bookPicture">
          </div> -->
          <div class="shop_right">
            <section class="shop_detail_header">
              <h4 class="shop_title ellipsis">{{order.orderId}}</h4>
              <p class="order_price">
                  <span>价格¥{{order.amount}}</span>
              </p>
            </section>
            <section class="shop_rating_order">
              <section class="shop_distance">
                <div class="order_name">
                  下单人姓名：{{order.orderName}}
                  <div class="order_tel ">
                    电话：{{order.orderTel}}
                  </div>
                </div>
                <div class="order_status">
                    {{order.status == 0 ?'未支付' : '已支付'}}
                </div>
              </section>
              <section class="shop_distance">
                <div class="order_address"> 地址：{{order.orderAddress}}</div>
              </section>
              <section class="shop_rating_order_left">
                
                
              </section>
              <!-- <section class="shop_distance">
                
              </section> -->
              <div class="rating_section order_time">
                  下单时间：{{order.orderDate}}
              </div>
              
            </section>
            
          </div>
        </a>
      </li>
    </ul>
    <!-- <div class="content">
      <van-tabs color="#ffc400">
        <van-tab v-for="(order, index) in orders" :key="index" :title="order">
          <div
            v-for="(i, ind) in store.state.orderListed"
            :key="ind"
            v-if="item == '全部' && store.state.orderListed.length"
          >
            <van-card
              :num="i.num"
              :price="i.price"
              :title="i.title"
              :thumb="i.pic"
            />
          </div>
          <Blank v-else />
        </van-tab>
      </van-tabs>
    </div> -->
  </div>
  
</template>

<script>
  import {mapState} from 'vuex'
  import Star from '../Star/Star.vue'

  export default {
    data () {
      return {
        orderId:'',
        baseImgUrl: 'http://cangdu.org:8001/img/'
      }
    },
    mounted(){
      console.log("进来了OrderList")
      console.log(this.orders)
    },
    methods: {
      // getOrderListByUserId (userId) {
      //   if(userId) {
      //     this.$store.dispatch('getOrderByUserId',userId)
      //   }
      // }
    },
    computed: {
      ...mapState(['shops']),
      ...mapState(['orders']),
      ...mapState(['userInfo'])
    },
    components: {
      Star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .shop_container
    margin-bottom 50px
    .shop_list
      .shop_li
        bottom-border-1px(#f1f1f1)
        width 100%
        >a
          clearFix()
          display block
          box-sizing border-box
          padding 15px 8px
          width 100%
          .shop_left
            float left
            box-sizing border-box
            
            height 75px
            padding-right 10px
            .shop_img
              display block
              width 100%
              height 100%
          .shop_right
            float right
            width 100%
            .shop_detail_header
              clearFix()
              width 100%
              .shop_title
                float left
                width 200px
                color #333
                font-size 11px
                line-height 16px
                font-weight 700
                &::before
                  content '订单编号：'
                  display inline-block
                  font-size 11px
                  line-height 11px
                  color #333
                  background-color #ffd930
                  padding 2px 2px
                  border-radius 2px
                  margin-right 5px
              .shop_detail_ul
                float right
                margin-top 3px
                .supports
                  float left
                  font-size 10px
                  color #999
                  border 1px solid #f1f1f1
                  padding 0 2px
                  border-radius 2px
            .shop_rating_order
              clearFix()
              width 100%
              margin-top 8px
              margin-bottom 8px
              .shop_rating_order_left
                float left
                color #ff9a0d
                .rating_section
                  float left
                  font-size 10px
                  color #ff6000
                  margin-left 4px
                .order_section
                  float left
                  font-size 13px
                  color #666
                  transform scale(.8)
              .shop_rating_order_right
                float right
                font-size 0
                .delivery_style
                  transform-origin 35px 0
                  transform scale(.7)
                  display inline-block
                  font-size 12px
                  padding 1px
                  border-radius 2px
                .delivery_left
                  color #fff
                  margin-right -10px
                  background-color #02a774
                  border 1px solid #02a774
                .delivery_right
                  color #02a774
                  border 1px solid #02a774
            .shop_distance
              clearFix()
              width 100%
              font-size 12px
              .shop_delivery_msg
                float right
                transform-origin 0
                transform scale(.9)
                color #666
              .segmentation
                color #ccc
      .order_time
        font-size: 12px
        float: right
      .order_name
        font-size: 12px
        float left
      .order_tel
        font-size: 12px
        float right
        margin-left: 20px
      .order_address
        float: left
        font-size: 12px
        margin-top: 5px
        margin-left: 3px
      .order_price
        float: right
        font-size: 12px
      .order_status
        float: right
        font-size: 12px
</style>
