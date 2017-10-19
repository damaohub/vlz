<template>
  <div class="users-container">
    <x-header slot="header"
              title="账号列表">
      <a slot="overwrite-left" @click="toggleEdit()" style="font-size: 16px">{{editText}}</a>
      <a v-show="!isEdit" slot = "right" @click="showOpts=true"><span class="iconfont icon-plus">&#xe6be;</span></a>
      <a v-show="isEdit" slot = "right" @click="del()">删除</a>
    </x-header>

    <scroller :on-infinite="infinite" :on-refresh="refresh">
      <div style="height: 46px;"></div>

      <group v-if="showBulletin" gutter="0" class="bulletin">
        <cell value="value">
          <span class="iconfont red" slot="icon">&#xe60d;</span>
        <MarqueeTips :content="bulletinContent" :speed="bulletinSpeed"></MarqueeTips>
        </cell>
      </group>

      <card class="panel-user" v-if="showCount">
        <div slot="content" class="card-demo-flex card-user-content">
          <div class="vux-1px-l vux-1px-r">
            总账户人数
            <br/>
            <span>{{totalUsers}}人</span>
          </div>
          <div class="vux-1px-r">
            在线账户<br/>
            <span>{{onlineUsers}}人</span>
          </div>
        </div>
      </card>

      <flexbox class="flex-row-user" wrap="wrap">
        <flexbox-item :span="3" v-for="(user,index) in users" :key="user.Uin">
          <check-icon @updateval="isChecked(user)"  :edit="isEdit">
            <flexbox orient="vertical">
              <img :class="['userHeader',user.Status == 0?'toGrey':'']" :src="user.HeadImgUrl" :alt="user.Uin">
              <span :class="['line-stat',user.Status == 1?'online':'offline']"><i></i>{{user.Status == 1?'在线':'下线'}}</span>
              <h3 class="user-name">{{user.NickName}}</h3>
            </flexbox>
          </check-icon>
        </flexbox-item>

      </flexbox>

    </scroller>


    <div v-transfer-dom>
      <popup is-transparent v-model="showOpts" @on-hide="" @on-show="">
        <div style="width: 95%;background-color:#fff;height:auto;margin:0 auto;border-radius:5px;padding-top:6px;">
          <group style="margin: auto 10px">
            <x-button type="primary" @click.native="getQrcode()">添加账号</x-button>
            <x-switch title="公告开关" v-model="showBulletin"></x-switch>
            <x-switch title="账号统计" v-model="showCount"></x-switch>
          </group>
          <group style="padding: 10px">
            <x-button type="default" @click.native="showOpts=false">确定</x-button>
          </group>
        </div>
      </popup>
    </div>


    <div v-transfer-dom>
      <x-dialog v-model="showAdd" class="add">
        <div class="img-box">
          <img :src="qrcode" style="max-width:100%">
        </div>
        <x-button @click.native="checkStatus()" :type="isDisabled?'default':'primary'" :disabled="isDisabled">{{btnMsg}}<inline-loading v-if="isDisabled"></inline-loading></x-button>
        <div @click="showAdd=false">
          <x-icon type="ios-close-outline" style="fill:#fff;"></x-icon>
        </div>
      </x-dialog>
    </div>

  </div>
</template>

<script>
  import {XHeader, Flexbox, FlexboxItem, CheckIcon, XDialog, XButton, InlineLoading, Icon, Card, Popup, XSwitch, Group, Cell, CellBox, TransferDomDirective as TransferDom} from 'vux';
  import MarqueeTips from 'vue-marquee-tips';
  import config from '../axios-config'
  import axios from 'axios';
  export default {
    directives: {
      TransferDom
    },
    components: {
      MarqueeTips,
      Flexbox,
      FlexboxItem,
      XHeader,
      CheckIcon,
      XDialog,
      XButton,
      InlineLoading,
      Icon,
      Card,
      Popup,
      XSwitch,
      Group,
      Cell,
      CellBox
    },
    name: 'users',
    data () {
      return {
        isEdit: false,
        editText: '编辑',
        page: 0,
        pageEnd: false,
        users: [],
        checkedArr: [],
        unCheckedArr: [],
        showAdd: false,
        isDisabled:false,
        WechatSDK: {
          Code: "c576eb13-3dca-4e38-9e6e-a4c09bb151ac",
          Host: "m.hjshztc.com/web"
        },
        qrcode: '../static/loading_more.gif',//微信登录的二维码
        NotifyKey: '',
        UuID: '',
        btnMsg: '正在获取...',//
        UserName: '',//微信账号（Uin)
        NickName: '',//微信号昵称
        HeadImageUrl: '',//微信头像

        showOpts: false,
        showBulletin: true,
        showCount: true,

        bulletinContent: '',
        bulletinSpeed: 8,

        onlineUsers: 0,
        totalUsers: 0

      }
    },
   created:  function () {//箭头函数会破坏this,导致this.$store.state.token取不到
      this.getUsers();
      this.getBulletin();
    },
    methods: {

      /*获取用户列表
      * 请求接口wechat-list
      * */
      getUsers () {
        axios.post('wechat-list',{Token: this.$store.state.token,page: this.page},config)
          .then((res) => {
            if(res.data.rescode === 0){
                if(res.data.resdata.length!=0){
                  if(this.page === 0) {
                    this.users = [];
                    if(res.data.resdata.length<32){
                      this.pageEnd = true;
                    }else {
                      this.pageEnd = false;
                    }
                  }
                  this.users.push.apply(this.users,res.data.resdata);
                  this.getUserNumber();
                }else{
                  this.pageEnd =true;
                }
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
      },

      /*切换编辑状态*/
      toggleEdit  () {
        this.isEdit = !this.isEdit;
        if(this.isEdit===true){
          this.editText = '取消';
          this.users.forEach((item,index,array) => {
            this.$set(item, 'isChecked', false)
          })
        }else {
          this.editText = '编辑';
//          this.users.forEach ((item, index, array) => {
//              item.isChecked = false;
//          });
        }
      },

      /*选中后的操作
       * 过滤选中项
       * */
      isChecked (user) {
        user.isChecked =!user.isChecked;
        this.checkedArr =  this.users.filter((item,index,arr)=>{
          return item.isChecked===true;
        });
        this.unCheckedArr =  this.users.filter((item,index,arr)=>{
          return item.isChecked===false;
        });

      },

      /*执行删除操作
      * 请求接口delete
      * */
      del () {
          if(this.checkedArr!=0){
            var uins = this.checkedArr.map((item,index,array)=> {
                return item.Uin;
            });
            axios.post('delete',{Token: this.$store.state.token,Uin: JSON.stringify(uins)},config)
              .then((res) => {
                if(res.data.rescode === 0){
                   this.users = this.unCheckedArr;
                   this.isEdit = false;
                    this.editText = '编辑';
                   this.$vux.toast.show({
                      text: res.data.resmsg,
                      type: 'success'
                    })
                  this.getUserNumber();
               }else {
                  this.isEdit = false;
                  this.editText = '编辑';
                  this.$vux.toast.show({
                    text: res.data.resmsg,
                    type: 'warn'
                  });
                }

              })
              .catch((err) => {
                console.log(err);
              })
          }else {
            this.$vux.toast.show({
              text: '请选择要删除的项目',
              type: 'text'
            });
          }
      },

      /*获取二维码
      * 请求接口(WechatSDK)/wx/qrcode-get
      * */
      getQrcode () {
        this.showOpts=false;
        this.showAdd = true;
        axios.post('http://' + this.WechatSDK.Host + '/wx/qrcode-get',{AccessToken: this.WechatSDK.Code})
          .then((res) => {
            if(res.data.rescode === 0){
           this.qrcode = 'data:image/png;base64,'+res.data.resdata.QrCodeImageBuffer;
              this.NotifyKey = res.data.resdata.NotifyKey;
              this.UuID = res.data.resdata.UuID;
              this.btnMsg = '请用手机微信扫描登录';
              setTimeout(()=>{
                  this.btnMsg = '已扫描确认登录'
              },2500)
            }else {
              this.$vux.toast.show({
                text: res.data.resmsg,
                type: 'warn'
              })
              this.isDisabled = true;
              setTimeout(()=>{
                this.showAdd = false;
              },2000)
            }
          })
          .catch((err) => {
            console.log(err);
          })
      },

      /*检查二维码状态
      * 请求接口 (WechatSDK)/wx/qrcode-status */
     checkStatus () {
       this.isDisabled = true;
       this.btnMsg = '尝试登录';
        axios.post('http://' + this.WechatSDK.Host + '/wx/qrcode-status', {
          AccessToken: this.WechatSDK.Code,
          UuId: this.UuID,
          NotifyKey: this.NotifyKey
        })
          .then((res)=>{
            if(res){
                if(res.data.rescode == 0){

                  switch (res.data.resdata.Status){
                    case 0:
                      this.isDisabled = false;
                      this.$vux.toast.show({
                        text: '未扫描，请手机扫描登录',
                        type: 'text'
                      });
                      break;
                    case 1:
                      this.isDisabled = false;
                      this.$vux.toast.show({
                        text: '已扫描，请在手机点击登录',
                        type: 'text'
                      });
                      //this.HeadImageUrl =res.data.resdata.HeadImageUrl;
                      break;
                    case 2:
                        this.btnMsg = '正在登录...'
                        this.UserName = res.data.resdata.UserName;
                        this.NickName = res.data.resdata.NickName;
                        this.HeadImageUrl = res.data.resdata.HeadImageUrl;
                        this.addUser();
                        break;
                    case -2017:
                      this.$vux.toast.show({
                        text: '😓出错了，重新添加吧',
                        type: 'warn'
                      });
                      this.isDisabled = false;
                      this.showAdd = false;
                      break;
                    default:
                      this.isDisabled = false;
                      this.btnMsg = '请用手机微信扫描登录';
                      break;
                  }

                }
            }else{
              this.isDisabled = false;
            }

          })
          .catch((err) => {
            console.log(err);
          })
      },

     /*添加用户到列表
     * 请求接口wechat-login
     * */
     addUser () {
       this.showAdd = false;
       this.btnMsg = '正在获取...'
       this.isDisabled = false;
       axios.post('wechat-login',{
         Token: this.$store.state.token,
         Uin: this.UserName,
         HeadImgUrl: this.HeadImageUrl,
         NickName: this.NickName
       },config)
         .then((res) => {
            if(res.data){
                if(res.data.rescode ==0){
                    this.page =0;
                  this.getUsers();
                  this.$vux.toast.show({
                    text: '添加成功',
                    type: 'success'
                  });
                }else {
                  this.$vux.toast.show({
                    text: '添加失败,请稍后重试',
                    type: 'warn'
                  });
                }
            }else {
              this.$vux.toast.show({
                text: '添加失败,请检查网络连接',
                type: 'warn'
              });
            }
         })
         .then((err) => {
           console.log(err);
         })
     },

      /*
       * 下拉刷新
       * */
      refresh (done) {
        setTimeout(() => {
          this.page =0;
          this.getUsers();
          done();
        })
      },

      /*
      * 上拉加载
      * */
      infinite (done) {
        if(this.pageEnd == true) {
          setTimeout(() => {
            done(true);
          },1500)
        }

        if(this.pageEnd == false){
          setTimeout(() => {
            this.page+=1;
           this.getUsers();
            setTimeout(() => {
              done();
            })
          },1500)
        }

      },

      /*
       * 获取账号数目
       * 请求接口：wechat-number
       * */
      getUserNumber () {
        axios.post('wechat-number',{Token: this.$store.state.token},config)
          .then((res) => {
            if(res.data.rescode === 0){
              this.onlineUsers = res.data.resdata.online;
              this.totalUsers = res.data.resdata.sum;
              //this.$store.commit('saveUserInfo',this.userInfo||res.data.resdata);
            }else {
              this.$vux.toast.show({
                text: res.data.resmsg,
                type: 'warn'
              })
              this.onlineUsers =  this.totalUsers = "暂无数据";
            }
          })
          .catch((err) => {
            console.log(err);
          })
      },
      /*
       * 获取公告
       * 请求接口：bulletin
       * */
      getBulletin () {
        axios.post('bulletin',{Token: this.$store.state.token},config)
          .then((res) => {
            if(res.data.rescode === 0){
              this.bulletinContent = res.data.resdata.$bulletin.ConfigContent;
              if(this.bulletinContent.length == 0) {
                  this.showBulletin = false;
              }else{
                this.bulletinSpeed = 5+(this.bulletinContent.length/10);
              }
              //this.$store.commit('saveUserInfo',this.userInfo||res.data.resdata);
            }else {
              this.$vux.toast.show({
                text: res.data.resmsg,
                type: 'warn'
              })
              this.bulletinContent = "未得到数据";
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
<style  lang="less" >
  @import '~vux/src/styles/close';
  .toGrey{
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
  }
  .flex-row-user{margin-top: 10px;}
.vux-flexbox-item{width: 25%;position:relative;overflow: hidden;}
.userHeader{width: 60%;max-width: 128px;border-radius: 50%;padding: 2px;border: 2px solid #d2d6de;font-size: 12px;}
.user-name{font-size: 1rem;white-space: nowrap;text-overflow: clip;overflow: hidden;}
.line-stat{color: #777;font-size: .8rem;display: block;}
.line-stat i{display: inline-block;width: 8px;height: 8px;border-radius: 50%;margin-right: 5px;}
.online{color: green;}
.online i{background: green;}
.offline i{background: #666;}
  .vux-flexbox-item .vux-check-icon{top:20px;}
  .vux-check-icon .i.weui-icon{display: none;}

.add .weui-dialog{background-color:#646466;}
.add .img-box{background: #fff; }
.add .vux-spinner{width: 100%;height: 100%;}
  .vux-check-icon .icons .weui-icon-circle{color: #1aad19;}
  .vux-check-icon .icons{position: absolute;z-index:99;}
  .iconfont.icon-plus{font-size: 22px;padding-right: 0;}
  .pad{padding: 20px;}
  .weui-panel.panel-user{margin:0;}
  .card-user-content{padding: 5px 0;}
  .bulletin .weui-cell__ft{width: 100%;}
</style>
