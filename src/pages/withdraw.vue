<template>
  <div>
    <x-header slot="header"
              title="提现"
    >

    </x-header>
    <card class="card" :header="{title:'到支付宝'}">
      <div slot="content" class="card1">
        <x-input type="number"  placeholder="请输入金额" keyboard="number"  autofocus="autofocus" required  v-model="Integral" >
          <span slot='label' class="iconfont">&#xe601;</span>
        </x-input>
        <small style="color: #999;">提现金额最少5元</small>
        <small style="color: #999; float: right">目前提现额度<span class="red">{{AllowPurse}}</span> 元</small>
        <x-button  @click.native="submit()" :disabled="_isDisabled ||isDisabled" type="primary">
          提现<inline-loading v-if="isDisabled&&showLoging"></inline-loading>
        </x-button>
      </div>
    </card>
    </div>
</template>

<script>
  import {XHeader, Card, XInput, XButton, InlineLoading} from 'vux'
  import config from '../axios-config'
  import axios from 'axios'
  export default {
    components: {
      XHeader,
      Card,
      XInput,
      XButton,
      InlineLoading
    },
    name: 'withdraw',
    data () {
      return{
        isDisabled: true,
        Integral: '',
        AllowPurse: this.$store.state.userInfo.AllowPurse,
        showLoging: false
      }
    },
    computed: {
      _isDisabled:  {
        get: function () {
          if(this.Integral.length != 0) {
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
       if (parseInt(this.Integral)<5){
         this.$vux.toast.show({
           text: "提现金额不能小于￥5.00元",
           type: 'text'
         });
         this.showLoging = false;
         return;
       }
        axios.post('gold-purse',{Token: this.$store.state.token, Integral: this.Integral,},config)
          .then((res)=>{
            this.isDisabled = false;
            this.showLoging = false;
            if(res.data.rescode===1){
              this.$vux.toast.show({
                text: res.data.resmsg,
                type: 'success'
              });
              this.$router.push('/bill');
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
    }
  }
</script>

<style  lang="less">
  @import '~vux/src/styles/1px.less';
  .card {  padding: 15px; margin: 10px;}
</style>
