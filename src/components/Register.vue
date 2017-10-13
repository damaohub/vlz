<template>
<div class="cell field" >

    <div class="cell-wrapper">
        <div class="cell-title">
            <span class="cell-text">手机号：</span>
        </div>
        <div class="cell-value">
            <input class="field-core" v-model="form.Phone" type="tel" placeholder="请输入手机号"  required="required" >
        </div>
    </div>
    <div class="cell-wrapper">
        <div class="cell-title">
            <span class="cell-text">验证码：</span>
        </div>
        <div class="cell-value">
            <input class="field-core" type="text" v-model="form.MobileVerifyCode" placeholder="请输入验证码"  required="required" >
            <button @click="getMcode()"  :disabled="Mcode.disabled"  :class="['btn', Mcode.disabled?'btn-default':'btn-primary']">{{Mcode.text}}</button>
        </div>
    </div>
    <div class="cell-wrapper">
        <div class="cell-title">
            <span class="cell-text">密  码：</span>
        </div>
        <div class="cell-value">
            <input class="field-core" type="password" v-model="form.Password" placeholder="请输入密码" required="required" >
        </div>
    </div>
    <div class="cell-wrapper">
        <div class="cell-title">
            <span class="cell-text">邀请码：</span>
        </div>
        <div class="cell-value">
            <input class="field-core" v-model="form.yqma" type="text" placeholder="填写邀请码">
        </div>
    </div>
  <div class="cell-wrapper">
    <div class="cell-title">
      <span class="cell-text">支付宝名称：</span>
    </div>
    <div class="cell-value">
      <input class="field-core" v-model="form.AlipayName" vtype="text" placeholder="所用的支付宝名字（必填）" required="required">
    </div>
  </div>
    <div class="cell-wrapper">
        <div class="cell-title">
            <span class="cell-text">支付宝：</span>
        </div>
        <div class="cell-value">
            <input class="field-core" v-model="form.Alipay" vtype="text" placeholder="提现所用的支付宝（必填）" required="required">
        </div>
    </div>

    <div class="cell-wrapper no-border">
        <button @click="register()" :disabled="form.regIsDisabled" :class="['btn','btn-inline',form.regIsDisabled?'btn-default':'btn-primary']">注册</button>
    </div>
    <div class="cell-wrapper no-border">
        <div class="cell-left">
            <a href="#/login"><small>已有账号登录</small></a>
        </div>
    </div>
</div>

</template>
<script>

import axios from 'axios'

    export default {
        name: 'register',
        data () {
            return {
              form: {
                 Phone: '',
                 MobileVerifyCode: '',
                 Password: '',
                  InviteCode: '',
                Alipay: '',
                AlipayName: '',
                regIsDisabled: false
              },
              Mcode: {
                disabled: false,
                text: '发送验证码',
                timer: 60

              }

            }
        },
        methods: {
            register: function(){
              var _this = this;
              _this.form.regIsDisabled = true;
                if(_this.form.Phone == "" || _this.form.Password == ""){
                    alert("请输入手机号或密码");
                      _this.form.regIsDisabled = false;
                }else{
                    axios.post('hostPlace/api/regist', {
                       Phone : _this.form.Phone,
                       MobileVerifyCode : _this.form.MobileVerifyCode,
                       Password : _this.form.Password,
                        Alipay: _this.form.Alipay,
                        InviteCode: _this.form.InviteCode,
                      AlipayName:_this.form.AlipayName
                        })
                  .then(function (response) {
                        alert(response.data.resmsg);
                    _this.form.regIsDisabled = false;
                    _this.$router.push({ path: 'login' });
                  })
                  .catch(function (error) {
                        console.log(error);
                  });
                }

            },
            getMcode: function(){
              var _this = this;
                _this.Mcode.disabled=true;
                axios.post('hostPlace/api/verify-code', {
                  Phone : _this.form.Phone

                })
                  .then(function (response) {
                    alert(response.data.resmsg)
                    //_this.form = response.resdata;
                  })
                  .catch(function (error) {
                    console.log(error);
                  });


                if(_this.Mcode.disabled){
                    var interval = setInterval(function () {
                      _this.Mcode.text = (_this.Mcode.timer--)+'s后重新获取';
                      if(_this.Mcode.timer==0){
                        _this.Mcode.disabled=false;
                        window.clearInterval(interval);
                        _this.Mcode.timer=60;
                        _this.Mcode.text='发送验证码';
                      }
                    },1000)
                }



            }

        }

    }
</script>

<style lang="">


    .no-border{border:none;padding:2px auto;}

    .cell-title{
        width:105px;
    }
    .cell-text{
        vertical-align: middle;
    }
    .cell-value{
        display: flex;
        align-items: center;
        flex: 1;
        color: inherit;
    }
    .field-core{appearance:none;
     border-radius: 0;
    border: 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    outline: 0;
    line-height: 1.6;
    font-size: inherit;
    width: 100%;}
    .cell-left,.cell-right{
        flex:1;
    }
     .cell-left{
         text-align:left;
     }

     .cell-right{
         text-align:right;
     }
    .btn-inline{
        width:100%;
    }
.btn-default{
     background-color: #ccc;
      color: #fff;
}
.btn-primary{
    background-color:#26a2ff;
    color: #fff;
}


</style>
