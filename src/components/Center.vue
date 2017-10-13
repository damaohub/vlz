<template>
    <div class="with-footer">
        <a @click="toLogin()" class="card" :disabled="isDisabled" :style="{backgroundImage:icons.cardBg }">
            <img class="personal_logo" :src="icons.cardImg" alt="">
            <div class="userinfo">
                <div  class="personal_title">{{userInfo.Phone}}</div>
            </div>
             <i class="cell-allow-right"></i>
        </a>
        <ul class="cells first-cells">
            <li class="cell">
                <a @click="toWallet()" class="cell-wrapper">
                    <div class="cell-title">
                        <img  :src="icons.my_order_user_icon_normal" alt="">
                        <span class="cell-text">钱包明细</span>

                    </div>
                </a>
              <small class="je">总金额：{{userInfo.TotalIntegral}}元</small>
                <i class="cell-allow-right"></i>
            </li>
            <li class="cell">
                <a @click="toCash()" class="cell-wrapper noborder">
                    <div class="cell-title">
                        <img  :src="icons.my_wallet_user_icon_normal" alt="">
                        <span class="cell-text">我要提现</span>
                    </div>
                </a>
              <small class="je">可提现：{{userInfo.AllowPurse}}元</small>
                <i class="cell-allow-right"></i>
            </li>
          <ul class="cells">
            <li class="cell">
              <a href="mqq://im/chat?chat_type=wpa&uin=97107977&version=1&src_type=web" class="cell-wrapper noborder">
                <div class="cell-title">
                  <img  :src="icons.my_contact_icon_normal" alt="">
                  <span class="cell-text">联系客服</span>
                </div>
              </a>
              <small class="je" style="color: red;">QQ:97107977</small>
              <i class="cell-allow-right"></i>
           </li>
          </ul>
        </ul>
        <ul class="cells">
            <li class="cell">
                <a @click="logOut()" class="cell-wrapper noborder">
                    <div class="cell-title">
                        <img  :src="icons.my_outlogin_user_icon_normal" alt="">
                        <span class="cell-text">退出登录</span>
                    </div>
                </a>
                <i class="cell-allow-right"></i>
            </li>

        </ul>
        <foot></foot>

    </div>
</template>

<script>
import footer from '@/components/Footer'
import axios from 'axios'

   export default  {
        name: 'center',
        components: {'foot': footer},
        data () {
            return {
                icons: {
                    'my_order_user_icon_normal' :'/static/img/my_order_user_icon_normal.png',
                    'my_wallet_user_icon_normal' :'/static/img/my_wallet_user_icon_normal.png',
                    'my_contact_icon_normal' :'/static/img/my_contact_user_icon_normal.png',
                    'my_coupon_user_icon_normal' :'/static/img/my_coupon_user_icon_normal.png',
                    'my_setting_user_icon_normal' :'/static/img/my_setting_user_icon_normal.png',
                    'my_outlogin_user_icon_normal' :'/static/img/my_outlogin_user_icon_normal.png',
                    'cardBg' :'url(/static/img/api_31.png)',
                    'cardImg' :'/static/img/api_32.png'
                },
                userInfo: {
                  Phone: window.localStorage.getItem('Phone'),
                  AllowPurse: '',
                  TotalIntegral: '',
                  InviteCode: ''

                },
              isDisabled: false

            }
        },
   created: function () {
       this.getInfo();
     },
     methods: {
       getInfo: function () {
              var _this = this;
              var token = window.localStorage.getItem('Token');
              var phone = window.localStorage.getItem('Phone');
              if(token && phone) {
                axios.post('hostPlace/api/user-info', {
                  Phone: phone,
                  Token: token
                })
                  .then(function (response) {
                    if(response.data.rescode==0){
                      _this.userInfo.AllowPurse = response.data.resdata.AllowPurse;
                    _this.$store.commit('AllowPurse',response.data.resdata.AllowPurse);
                    _this.$store.commit('InviteCode',response.data.resdata.InviteCode);
                    _this.userInfo.TotalIntegral = response.data.resdata.TotalIntegral;
                    _this.userInfo.Phone = response.data.resdata.Phone;
                    _this.isDisabled = true;
                    }else {
                        alert(response.data.resmsg);
                      _this.$router.push({path: 'login'});
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            },
       toLogin: function () {
         if(!this.isDisabled){
             this.$router.push({path: 'login'});
         }
       },
       toWallet: function () {
         this.$router.push({path: 'wallet'})
       },
       toCash: function () {
         this.$router.push({path: 'getcash'});
       },
       logOut: function () {
         window.localStorage.clear();
         this.$router.push({ path: 'login' })
       }


     }
    }
</script>

<style >
    .with-footer .cell a{color:#2c3e50;}
    .cells:first-child,.cells.first-cells{border-top:0;}
    .cells{border-top:5px solid #f0f0f0;}
    .cell-title{text-align: left;}
    .card{
        display: block;
        height: 66vw;
        position: relative;
        vertical-align: bottom;
        color: #fff;
        background-position: center;
        background-size: cover;}
    .personal_logo{
        position: absolute;
        left: 0;
        top: 70px;
        width: 70px;
        margin-left: 20px;}
    .personal_title {
        font-size: 20px;
        color: #fff;
    }
    .userinfo{
        position: absolute;
        top: 95px;
        margin-left: 100px;
    }


  .indicator{display: block; transition: opacity .2s linear;}
    .indicator-wrapper{     padding: 15px;   top: 50%;
      left: 50%;
      position: fixed;
      -webkit-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);
      border-radius: 5px;
      background: rgba(0,0,0,.7);
      color: #fff;
      box-sizing: border-box;
      text-align: center;}
    .indicator-spin{    display: inline-block;
      text-align: center;
    }
  .spinner-snake{
    border-top-color: rgb(204, 204, 204);
    border-left-color: rgb(204, 204, 204);
    border-bottom-color: rgb(204, 204, 204);
    height: 32px;
    width: 32px;
    animation: mint-spinner-rotate .8s infinite linear;
    border: 4px solid transparent;
    border-radius: 50%;}
  .indicator-text{
    display: block;
    color: #fff;
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
  }
.je{
  position: absolute;top:36%;right: 45px;
}
</style>
