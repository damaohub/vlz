<template>
  <div>
    <x-header slot="header"
              :left-options="{showBack: false}"
              title="登录">

    </x-header>

      <group>
        <x-input  name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"  v-model="Phone" ><span slot="label" class="iconfont">&#xe602;</span></x-input>
        <x-input  type="password" placeholder="请输入密码" :min="6" :max="20"  v-model="Password"><span slot="label" class="iconfont">&#xe61f;</span>&#xe61f;</x-input>
      </group>

    <group>
      <x-button  @click.native="submit()" :disabled="_isDisabled || isDisabled" type="primary">
        <span v-if="isDisabled&&showLoging">正在登录<inline-loading></inline-loading></span>
        <span v-else>登录</span>
      </x-button>
    </group>
    <p style="margin:20px 10px 0">
      <small>没有账号？<router-link to="/regist">注册</router-link></small>
      <small style="float: right;"><router-link to="/repass">忘记密码</router-link></small>
    </p>

  </div>
</template>

<script>
  import {XHeader, XInput, Group, XButton, InlineLoading} from 'vux';
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
        showLoging: false,
        Phone:'',
        Password: '',
        token: '',
        userInfo: this.$store.state.userInfo || {}
      }
    },
    computed: {
      _isDisabled:  {
          get: function () {
            if(this.Phone.length != 0 && this.Password.length != 0) {
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
        axios.post('login',{Phone : this.Phone,Password: this.Password},config)
          .then((res)=>{
            this.isDisabled = false;
            this.showLoging = false;
            if(res.data.rescode===0){
              this.token = res.data.resdata.Token;
              this.$store.commit('isLogin',this.token);
              //if(this.$store.state.token==null) return;
              this.$vux.toast.show({
                text: res.data.resmsg,
                type: 'success'
              });
              this.Phone = "";
              this.Password = "";
              this.getUserInfo();
              this.$router.push('/');
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
            this.$vux.toast.show({
              text: res.data.resmsg,
              type: 'warn'
            })
            this.$router.push('/login');
        })

      },

      getUserInfo () {
        axios.post('user-info',{Token: this.$store.state.token},config)
          .then((res) => {
            if(res.data.rescode === 0){
              this.userInfo = res.data.resdata;
              this.$store.commit('saveUserInfo',this.userInfo||res.data.resdata);
            }else {
              this.$vux.toast.show({
                text: res.data.resmsg,
                type: 'warn'
              })
              this.$router.push({path: 'login'});
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }



    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vux-flexbox-item{width: 25%;}
</style>
