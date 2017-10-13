<template>
  <div class="with-footer">
      <a @click="toggle()"  class="btn btn-link fix-left-top">{{editLabel}}</a>
      <a @click="del()" v-if="showEdit" class="btn btn-link fix-right-top">删除</a>
      <button v-if="!showEdit" id="show-modal" @click="SetQrcodeImg2()" class="btn btn-link fix-right-top">添加</button>
      <modal v-if="showModal" @close="closeModal()">
            <h3 slot="header"></h3>
            <div slot="body">
                  <div>
                        <img v-if="isShowCode" :class="{loading:isLoading }" :src="WeCode" alt="获取验证码">
                  </div>
              {{WeMsg}}
            </div>
            <div slot="footer">
                <button  :disabled="isDisabled" v-if="isCheckLogin" @click="checkLogin()" class="btn btn-inline">{{loadingMsg}}<img
                  v-if="isDisabled" :src="loadingImg" alt=""></button>
            </div>
      </modal>
    <div class="callout" v-if="showCall">
      <div class="callout_left">*</div>
      <MarqueeTips :content="bulletinContent" :speed="speed"></MarqueeTips>
      <span class="callout_close" @click="showCall=false">x</span>
    </div>

      <p class="coup">总数<span>{{totalUsers}}</span>人,在线<span>{{onlineUsers}}</span>人</p>
      <ul class="flex-wrap flex-with-wrap users">
            <li v-for="(user,index) in users" :key="index"  class="flex-con user">
                  <label >
                  <a href="">
                  <img :class="[user.Status==0?'toGrey':'']"  :src="user.HeadImgUrl" alt="">
                  <span :class="['line-stat',user.Status==1?'online':'offline']" href=""><i></i>{{user.Status==1?'在线':'下线'}}</span>
                  <h3>{{user.NickName}}</h3>
                  <input v-if='showEdit' type="checkbox" @change='changeItem(user)'  v-model='user.isChecked' >
                  </a>
                  </label>
            </li>
     </ul>
     <foot></foot>
   </div>


</template>

<script>
import modal from '@/components/modal'
import footer from '@/components/Footer'
import axios from 'axios'
import MarqueeTips from 'vue-marquee-tips'
    export default {
      name: 'home',
      components: {'modal': modal, 'foot': footer,  MarqueeTips},
      data () {
        return {
          showEdit: false,
          editLabel: '编辑',
          showModal: false,
          isShowCode: true,
          users: [],
          page: 0,
          totalUsers: '',
          onlineUsers: '',
          checkboxModel: [],
          WechatSDK: {
            Code: "c576eb13-3dca-4e38-9e6e-a4c09bb151ac",
            Host: "m.hjshztc.com/web"
          },
          WeCode: '../static/img/loading_more.gif',
          loadingMsg: '尝试登录',
          loadingImg: '../static/img/loading_more.gif',
          isLoading: true,
          WeMsg: '',
          isDisabled: false,
          isCheckLogin: false,
          WeNotifyKey: '',
          WeUuID: '',
          WeUserName: '',
          WeNickName: '',
          HeadImageUrl: '',
          showCall: true,
          bulletinContent:'',
          speed: 5
        }

      },
      created: function () {
        this.getUsers();
        this.getScrollTop();
        this.getClientHeight();
        this.getScrollHeight();
        this.loadMore();
        this.toBulletin()
      },
      methods: {

        toBulletin: function () {
            if(this.showCall==true){
              var token = window.localStorage.getItem('Token');
              var _this = this;
              axios.post('hostPlace/api/bulletin',{
                Token: token,
              }).then(function (response) {
                if(response.data.rescode==0){
                 _this.bulletinContent=response.data.resdata.$bulletin.ConfigContent;
                 if(_this.bulletinContent.length==0){_this.showCall=false;}
                  if( _this.bulletinContent.length>0){
                      _this.speed =5+(_this.bulletinContent.length/10);
                  }
                }else {
                  alert(response.data.resmsg);
                }
              }).catch(function (error) {
                alert(error);
              })
            }
        },
        changeItem: function (item) {
          var leftItems = this.users.filter(function (item, index, array) {
            return item.isChecked == false;
          });
          var delItems = this.users.filter(function (item, index, array) {
            return item.isChecked == true;
          });
          return [delItems, leftItems];

        },
        toggle: function () {
          this.showEdit = !this.showEdit;
          if (this.editLabel == '编辑') {
            this.editLabel = '取消'
          } else {
            this.editLabel = '编辑'
          };
          this.users.map(function (item, index, array) {
            return item.isChecked = false;
          })

        },
        del: function () {
          var allArry = this.changeItem();
          var uins = allArry[0].map(function (item, index, array) {
            return item.Uin
          });
          var token = window.localStorage.getItem('Token');
          var _this = this;
          axios.post('hostPlace/api/delete', {
            Token: token,
            Uin: JSON.stringify(uins)
          })
            .then(function (response) {
              alert(response.data.resmsg);
              _this.users = allArry[1];
            })
            .catch(function (error) {
              console.log(error);
            })

        },

        getUsers: function () {
          var token = window.localStorage.getItem('Token');
          var _this = this;
          axios.post('hostPlace/api/wechat-number',{
            Token: token,
            page: _this.page
          }).then(function (response) {
              if(response.data.rescode==0){
                _this.onlineUsers = response.data.resdata.online;
                _this.totalUsers = response.data.resdata.sum;
              }else{
                alert(response.data.resmsg);
                _this.$router.push({path: 'login'});
              }
          })
            .catch(function (error) {
              console.log(error);
            });
          axios.post('hostPlace/api/wechat-list', {
            Token: token,
            page: _this.page
          })
            .then(function (response) {
              if(response.data.rescode==0){
                _this.users.push.apply(_this.users,response.data.resdata);
              }else {
                alert(response.data.resmsg);
                _this.$router.push({path: 'login'});
              }

            })
            .catch(function (error) {
              console.log(error);
            });
        },

        SetQrcodeImg2: function () {
          var _this = this;
          _this.showModal = true;
          axios.post('http://' + _this.WechatSDK.Host + '/wx/qrcode-get', {
            AccessToken: _this.WechatSDK.Code
          })
            .then(function (response) {
              if (response.data.rescode == 0) {
                _this.isLoading= false;
                _this.WeCode ='data:image/png;base64,'+response.data.resdata.QrCodeImageBuffer;
                _this.WeNotifyKey = response.data.resdata.NotifyKey;
                _this.WeUuID = response.data.resdata.UuID;
                _this.isCheckLogin=true;
              }
              _this.WeMsg = response.data.resmsg;

            })
            .catch(function (error) {
              console.log(error);
            });
        },
        checkLogin: function () {
            var _this = this;
          _this.isDisabled =true,
            _this.loadingMsg = '正在登录';
          axios.post('http://' + _this.WechatSDK.Host + '/wx/qrcode-status', {
            AccessToken: _this.WechatSDK.Code,
            UuId: _this.WeUuID,
            NotifyKey: _this.WeNotifyKey
          })
            .then(function (response) {
              //这个条件也许要加 检查一下二维码
              if (response) {
                if (response.data.rescode == 0) {
                  _this.isDisabled =false;
                  _this.loadingMsg = '尝试登录'
                  switch (response.data.resdata.Status) {
                    case 0:
                      _this.WeMsg = '未扫描，请微信扫描二维码登录';
                      break;
                    case 1:
                      _this.isLoading= false;
                      _this.HeadImageUrl =response.data.resdata.HeadImageUrl;
                      _this.WeMsg = '已扫描，请在手机点击登录';
                      _this.isShowCode = false;
                      _this.isCheckLogin=true;
                      break;
                    case 2:
                      _this.WeUserName = response.data.resdata.UserName;
                      _this.WeNickName = response.data.resdata.NickName;
                      _this.HeadImageUrl = response.data.resdata.HeadImageUrl;
                      console.log(response);
                      //_this.logLists();
                      break;
                    case -2017:
                      //_this.SetQrcodeImg2();//调用这个会进入死循环
                      _this.$router.go(0);
                      break;
                    default:
                      _this.isCheckLogin=true;
                      break;
                  }
                }else {
                    alert(response.data.resmsg);
                   _this.$router.go(0);
                }
              } else {
                _this.checkLogin();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        logLists: function () {
          var _this = this;
          axios.post('hostPlace/api/wechat-login', {
            Token: window.localStorage.getItem('Token'),
            Uin: _this.WeUserName,
            HeadImgUrl: _this.HeadImageUrl,
            NickName: _this.WeNickName
          })
            .then(function (response) {
              if (response.data) {
                if (response.data.rescode == 0) {
                  alert(response.data.resmsg);
                  _this.$router.go(0);
                } else {
                  _this.WeMsg = '添加微信失败,请稍后再试';
                  _this.isShowCode = false;
                  setTimeout(function () {
                    _this.showModal = false;
                  }, 3000)
                }
              } else {
                _this.WeMsg = '添加失败,请检查网络连接';
                _this.isShowCode = false;
                setTimeout(function () {
                  _this.showModal = false;
                }, 3000)
              }
            }).catch(function (error) {
            console.log(error);
          })
        },
        closeModal: function () {
          this.showModal = false;
          this.WeCode = '';
          this.WeMsg = '';
          this.$router.go(0);
        },
        closeCall: function () {
          this.showCall = false;
        },
        getScrollTop: function () {
          //滚动条在y轴上的滚动距离
          if (document.documentElement && document.documentElement.scrollTop) {
            this.scrollTop = document.documentElement.scrollTop;
          } else if (document.body.scrollTop) {
            this.scrollTop = document.body.scrollTop;
          }
          return this.scrollTop;
        },
        //内容可视区域的高度
        getClientHeight: function () {
          if (document.body.clientHeight && document.documentElement.clientHeight) {
            this.clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
          } else {
            this.clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
          }
          return this.clientHeight;
        },
        //内容可是区域的高度加上高度的溢出（滚动）的距离
        getScrollHeight: function () {
          return this.scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        },
        loadMore: function () {
          var _this = this;
          window.onscroll = function () {
            var scrollTop = _this.getScrollTop();
            var clientHeight = _this.getClientHeight();
            var scrollHeight = _this.getScrollHeight();
            if (scrollTop + clientHeight == scrollHeight) {
              _this.page += 1;
              _this.getUsers();
            }
          }

        }

      }
    }

</script>


<style>
.toGrey{
  -webkit-filter: grayscale(100%);
   -moz-filter: grayscale(100%);
   -ms-filter: grayscale(100%);
   -o-filter: grayscale(100%);
   filter: grayscale(100%);
   filter: gray;
}
.flex-with-wrap{ flex-wrap: wrap;}
.flex-with-wrap >.flex-con{flex: 0 1 auto;}

/*users*/
.users{padding-top: 30px; text-align: center;}
.user{width: 25%;padding: 0 0 15px;}

.user > label{position: relative;margin: 0 2px;}
label a{
pointer-events:none;
}
.user img{width: 60%;max-width: 128px;border-radius: 50%;padding: 2px;border: 2px solid #d2d6de;}
.user h3{white-space: nowrap;font-size: 16px; color: #333;text-overflow: inherit;overflow: hidden;max-width: 80px;text-align: center;margin: 0 auto;}
.user .line-stat{color: #777;font-size: 12px;display: block;}
.line-stat i{display: inline-block;width: 8px;height: 8px;border-radius: 50%;}
.online{color: green;}
.online i{background: green;}
.offline i{background: #666;}

input[type=checkbox]{
  position: absolute;
  bottom: 36px;
  left: 10%;
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 0;
  outline: 0!important;
  background-color: transparent;
/* -webkit-appearance: none; */}

.modal-body img{width:100%;}
.modal-body img.loading{width:64px;}

.coup{position: fixed;top:40px;font-size: 14px;width: 100%;text-align: center;z-index:10;background: #fff;margin: 0;}
.coup span{color: red;}

.modal-footer .btn img{width: 20px;position: absolute;}
  .callout{    position: relative;
    left: 0;
    top: 23px;
    width: 100%;
    background: #9ecdb9;
    z-index: 501;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    -webkit-transition-duration: 300ms;
    transition-duration: 300ms;
    max-height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;}
  .callout_left{
    color: yellow;
    float: right;
    position: absolute;
    top:30%;
    left:1px;
    vertical-align: middle;
  }
  .callout_close{
    color: yellow;
    float: right;
    position: absolute;
    top:1px;
    right:1px;
  }
.marquee-tips{width: 95% !important;margin: 0 auto;}
</style>
