<template>
  <div>
    <x-header slot="header"
              title="注册">

    </x-header>

      <group>
        <x-input title="手机号码"  placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" required v-model="form.Phone" ></x-input>
        <x-input title="验证码" placeholder="请输入验证码" class="weui-vcode" required v-model="form.MobileVerifyCode"  >
          <x-button slot="right" type="primary" mini :disabled="_minBtnDisabled || minBtnDisabled" @click.native="getMobileVerifyCode()">{{minBtnText}}</x-button>
        </x-input>
        <x-input title="密码" type="password" placeholder="请输入密码" required v-model="form.Password" ></x-input>
        <x-input title="邀请码" type="text" placeholder="请输入邀请码" v-model="form.InviteCode" ></x-input>
        <x-input title="支付宝名称" type="text" placeholder="请输入支付宝名称"  v-model="form.Alipay"></x-input>
        <x-input title="支付宝" type="text" placeholder="提现所用支付宝" required v-model="form.AlipayName"></x-input>
      </group>

    <group>
      <x-button  @click.native="submit()" :disabled="_isDisabled || isDisabled" type="primary">
        <span v-if="isDisabled&&showLoging">正在提交<inline-loading></inline-loading></span>
        <span v-else>注册</span>
      </x-button>
    </group>
    <p style="margin:20px 10px 0">
      <small><router-link to="/login">去登录</router-link></small>
    </p>
  </div>
</template>

<script>
  import {XHeader, XInput, Group, XButton, InlineLoading } from 'vux';
  import config from '../axios-config'
  import axios from 'axios';
  export default {
    components: {
      XInput,
      Group,
      XHeader,
      XButton,
      InlineLoading
    },
    name: 'users',
    data () {
      return {
        isDisabled: true,
        minBtnDisabled: true,
        minBtnText: '发送验证码',
        minBtnTimer: 60,
        showLoging: false,
        form: {
          Phone: '',
          MobileVerifyCode: '',
          Password: '',
          Alipay: '',
          InviteCode: '',
          AlipayName: ''
        }
      }
    },
    created:function () {
      //this.getUsers();
    },

    computed: {

      _minBtnDisabled: {
        get: function () {
          return this.minBtnDisabled = (/^1[0-9]{10}$/.test(this.form.Phone)) ? false : true;
        },
        set: function(newValue) {
          return newValue;
        }
      },

      _isDisabled:  {
        get: function () {
          if(this.form.Phone.length!=0
            && this.form.MobileVerifyCode.length!=0
            && this.form.Password.length!=0
            &&this.form.Alipay.length!=0
            &&this.form.InviteCode.length!=0
            &&this.form.AlipayName.length!=0){
              return this.isDisabled = false;
          }
        return this.isDisabled = true;
        },
        set: function (newValue) {
          return newValue;
        }
      }
    },
    methods: {
      submit () {
        this.isDisabled = true;
        this.showLoging = true;
        axios.post('regist',this.form,config)
          .then((res)=>{
            this.isDisabled = false;
            this.showLoging = false;
            if(res.data.rescode===0){

              this.$vux.toast.show({
                text: res.data.resmsg +'前去登录',
                type: 'success'
              });
              this.resetForm();
              this.$router.push('/login');
            }else if(res.data.rescode===-1){
              this.$vux.toast.show({
                text: res.data.resmsg,
                type: 'warn'
              })
            }else {
              this.$vux.toast.show({
                text: res.data.resmsg,
                type: 'text'
              })
            }

          })
          .catch((err)=>{
            console.log(err);
          })

      },

      getMobileVerifyCode () {
        this.minBtnDisabled = true;
        axios.post('verify-code',{Phone: this.form.Phone},config)
          .then((res) => {
            if(res.data.rescode === 0){
              this.$vux.toast.show({
                text: res.data.resmsg,
                type: 'success'
              })
              var interval = setInterval( () => {
                this.minBtnText= (this.minBtnTimer--)+'s后重新获取';
                this.minBtnDisabled = true;
                if(this.minBtnTimer==0){
                  window.clearInterval(interval);
                  this.minBtnTimer=60;
                  this.minBtnText='发送验证码';
                  this.minBtnDisabled=false;
                }
              },1000)
            }else {
              this.$vux.toast.show({
                text: res.data.resmsg,
                type: 'warn'
              })
            }
          })
          .catch((err) => {
            console.log(err);
          })
        this.minBtnDisabled=false;
      },

      resetForm () {
        let obj = this.form;
        for(let i in obj ){
            obj[i] = '';
        }
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vux-flexbox-item{width: 25%;}
</style>
