<template>
    <div>
      <a @click="$router.go(-1)"  class="btn btn-link fix-left-top">返回</a>
        <div class="cell field">
            <div class="cell-wrapper">
              <div class="cell-title">
                <b class="cell-text">可提现金额</b>
              </div>
              <div class="cell-value">
                 <span class="field-core text-right">{{user.AllowPurse}}</span>
              </div>
              <div class="cell-title width-auto">
              <b class="cell-text">元</b>
              </div>
            </div>
          <div class="cell-wrapper noborder">
            <div class="cell-title">
              <b class="cell-text">提现金额</b>
            </div>
            <div class="cell-value">
              <input class="field-core text-right" v-model="Integral"   type="number" min=0 placeholder="请输入提现金额" required="required">
            </div>
            <div class="cell-title width-auto">
              <b class="cell-text">元</b>
            </div>
          </div>
        </div>
        <div class="attention text-left">
          <h5 class="attention-title">温馨提示：</h5>
          <p>提现后可到钱包明细中查看状态</p>
        </div>
        <div class="btncon">

          <button @click="goCash()" :disabled="btnIsDisabled" :class="['btn','btn-inline',btnIsDisabled?'btn-default':'btn-primary']">提现</button>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  export default{
    name: 'getcash',
   data (){
        return{
          Integral:'',
          btnIsDisabled:false
        }
   },
    created:function () {
    this.toBgGrey();
  },
    methods:{
       toBgGrey: function () {
          if(document.getElementById('app')){
            document.getElementById('app').className="bg-grey";
          };
       },
      goCash: function () {
        var _this =this;
        var token = window.localStorage.getItem('Token');
        _this.btnIsDisabled = true;
        axios.post('hostPlace/api/gold-purse', {
          Integral: _this.Integral,
          Token: token
        })
          .then(function (response) {
            if(response.data.rescode==1){
              _this.btnIsDisabled = true;
              alert(response.data.resmsg);
              _this.btnIsDisabled = false;
            }else {
              alert(response.data.resmsg);
              _this.$router.push({path: 'center'});
            }

          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    computed: {
       user () {
         return this.$store.state.user
      }
    }
  }
</script>

<style>
  .field{background: #fff;}
  .text-right{text-align: right;}
  .field .width-auto{width: auto;padding-left: 5px; }
  .text-left{text-align: left;}
  .attention{padding: 10px;}
  .attention-title{font-size: 16px;font-weight: normal;line-height: 150%;}
  .attention p{font-size: 14px;line-height: 150%;}
  .btncon{padding: 50px 20px 0;}
</style>
