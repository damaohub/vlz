<template>
  <div>
    <x-header slot="header"
              title="重置密码">

    </x-header>

    <group>
      <x-input title="手机号码"  placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" required v-model="form.Phone"></x-input>
      <x-input title="验证码" placeholder="请输入验证码" class="weui-vcode" required v-model="form.MobileVerifyCode" >
        <x-button slot="right" type="primary" mini :disabled="minBtnDisabled" @click.native="getMobileVerifyCode()">{{minBtnText}}</x-button>
      </x-input>
      <x-input title="密码" type="password" placeholder="请输入密码" required v-model="form.Newpass" ></x-input>

    </group>

    <group>
      <x-button  @click.native="submit()" :disabled="isDisabled" type="primary">
        <span v-if="isDisabled&&showLoging">正在提交<inline-loading></inline-loading></span>
        <span v-else>提交修改</span>
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
        minBtnDisabled: false,
        minBtnText: '发送验证码',
        minBtnTimer: 60,
        showLoging: false,
        form: {
          Phone: '',
          MobileVerifyCode: '',
          Newpass: '',
        }
      }
    },
    created:function () {
      //this.getUsers();
    },

    computed: {

//      minBtnDisabled: {
//        get: function () {
//          return (/^1[0-9]{10}$/.test(this.form.Phone)) ? false : true;
//        },
//        set: function(newValue) {
//          return newValue;
//        }
//      },
      isDisabled:  {
        get: function () {
          if(this.form.Phone.length!=0
            && this.form.MobileVerifyCode.length!=0
            && this.form.Newpass.length!=0
           ){
            return false;
          }
          return true;
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
        axios.post('repass',this.form,config)
          .then((res)=>{
            console.log(res)
            this.isDisabled = false;
            this.showLoging = false;
            if(res.data.rescode===0){
              this.$vux.toast.show({
                text: res.data.resmsg + '前去登录',
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
            console.log(res);
            if(res.data.rescode === 0){
              this.$vux.toast.show({
                text: res.data.resmsg,
                type: 'success'
              })
              var interval = setInterval(() => {
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
              });
              this.minBtnDisabled = false;
            }
          })
          .catch((err) => {
            console.log(err);
          })

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
