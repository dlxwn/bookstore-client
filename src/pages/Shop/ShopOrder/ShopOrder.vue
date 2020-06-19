<template>
  <div>
    <br />
    <mt-field label="收货人姓名" placeholder="请输入姓名" v-model="username" :state="userState"></mt-field>
    <mt-field label="收件人地址" placeholder="请输入地址" v-model="address" :state="addressState"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone" :state="telState"></mt-field>
    <mt-cell title="商品数量(本):" v-model=num></mt-cell>
    <mt-cell title="应付金额(元):" v-model=amount></mt-cell>
    <mt-button type="primary" size="large" @click="submitOrder">提交订单</mt-button>
  </div>
</template>

<script>
  import AlertTip from '../../../components/AlertTip/AlertTip.vue'
  import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../../api'
  export default {
    name: 'ShopOrder',
    data(){
      return {
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
.mint-cell-text{
  font-weight: bold;
}
</style>
