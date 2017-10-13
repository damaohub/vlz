<template>
    <div class="with-footer">
      <button @click="goDetail()" class="btn btn-link fix-right-top">详情</button>
<h3>邀请码：<span class="red">{{InviteCode}}</span></h3>
      <p>长按邀请码拷贝</p>
      <img class="codeImg" :src="code" alt="">
      <p>共推广{{NextLevelNum}}人</p>
      <p>累计获得分成{{Rebate}}元</p>
      <button @click="getCopy()"  class="btn btn-primary">点击复制分享链接</button>
      <div v-if="copyFail" style="background:mistyrose">
        <small>复制失败,请手动复制</small>
        <p>{{shareLink}}</p>
      </div>

        <foot></foot>
    </div>
</template>

<script>
import footer from '@/components/Footer'
import axios from 'axios'
import Clipboard from 'Clipboard'
    export default  {
        name: 'invite',
        components: {'foot': footer},
      data () {
            return {
                code:'/static/img/loading_more.gif',
              InviteCode:'',
              Rebate: '0.0000',
              NextLevelNum: '0',
              shareLink: 'http:106.14.16.135/regist.html?InvitsCode=',
              clipboard: {},
              copyFail: false

            }
      },
      created: function () {
        this.getInvite();
      },
      methods: {
            getInvite: function () {
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
                      //_this.$store.commit('InviteCode',response.data.resdata.InviteCode);
                     var InviteCode = response.data.resdata.InviteCode;
                      _this.code = 'hostPlace/api/spread-qrcode?Spread='+InviteCode;
                      _this.InviteCode = InviteCode;
                      _this.NextLevelNum = response.data.resdata.NextLevelNum;
                      _this.Rebate = response.data.resdata.Rebate;
                      _this.shareLink = 'http://m.hjshztc.com/regist.html?InviteCode='+InviteCode;
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

        getCopy: function () {
           var _this = this;
          _this.clipboard = new Clipboard(".btn",{
            text: function () {
              return _this.shareLink;
            }
          });

          _this.clipboard.on('success', function(e) {
              alert("复制成功")
          });
          _this.clipboard.on('error', function(e) {
            _this.copyFail = true;
            console.log(e);
          });
        },
        goDetail: function () {
          this.$router.push({path: 'detail'})
        }
      }

    }


</script>
<style>
  .codeImg{max-width: 240px;margin:10px; }
  h3{color: #999;margin:5px auto; }
  .red{color: red;}
  p{margin: 5px 0;}
</style>
