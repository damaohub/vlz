<template>
<div class="cell field" >
    <div class="cell-wrapper">
        <div class="cell-title">
            <span class="cell-text">手机号：</span>
        </div>
        <div class="cell-value">
            <input class="field-core" v-model="Phone" type="tel" placeholder="请输入手机号"  required="required" >
        </div>
    </div>
    <div class="cell-wrapper">
        <div class="cell-title">
            <span class="cell-text">验证码：</span>
        </div>
        <div class="cell-value">
            <input class="field-core" v-model="VerifyCode" type="text" placeholder="填写6位验证码"  required="required" >
            <button @click="getMcode()" :disabled="Mcode.disabled"  :class="['btn', Mcode.disabled?'btn-default':'btn-primary']">{{Mcode.text}}</button>
        </div>
    </div>
    <div class="cell-wrapper">
        <div class="cell-title">
            <span class="cell-text">新密码：</span>
        </div>
        <div class="cell-value">
            <input class="field-core"  v-model="Newpass" type="password" placeholder="请输入新密码" required="required" >
        </div>
    </div>



    <div class="cell-wrapper no-border">
        <button @click="toFix()" :disabled="fixIsDisabled" :class="['btn','btn-inline',fixIsDisabled?'btn-default':'btn-primary']" >修改密码</button>
    </div>

</div>

</template>
<script>
  import axios from 'axios'
    export default {
        name: 'login',
        data () {
            return {
              Phone:'',
              VerifyCode: '',
              Newpass: '',
              fixIsDisabled: false,
              Mcode: {
                disabled: false,
                text: '发送验证码',
                timer: 60

              }
            }
        },
      methods: {
        toFix: function () {
            var _this = this;
          _this.fixIsDisabled= true;
          axios.post('hostPlace/api/repass',{
            Phone: _this.Phone,VerifyCode: _this.VerifyCode,Newpass: _this.Newpass
          })
            .then(function (response) {
              alert(response.data.resmsg);
              _this.fixIsDisabled= false;
              _this.$router.push({ path: 'login' })
            })
            .catch(function (error) {
            console.log(error);
          });
        },
        getMcode: function(){
          var _this = this;
          _this.Mcode.disabled=true;
                axios.post('hostPlace/api/verify-code', {
                  Phone : _this.Phone
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
