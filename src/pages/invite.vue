<template>
  <div>
    <x-header slot="header"
              title="推广邀请"
              :left-options="{showBack: false}">

    </x-header>
    <scroller style="padding-top: 44px;">
    <divider><h3 class="red">邀请码：{{InviteCode}}</h3></divider>
    <p style="text-align: center;"><small>下线注册需要上线邀请码</small></p>
    <card :header="{title:'扫码注册'}" :footer="{title: '下线注册页面'}" @on-click-footer="toShareLink">
      <div slot="content" class="card-padding">
        <qrcode :value="shareLink" type="img"></qrcode>
        <p>可以扫描二维码或者长按复制下面链接</p>
        <p class="red">{{shareLink}}</p>
      </div>

    </card>

    <divider></divider>

    <card :header="{title:'推广详情'}" :footer="{title:'查看更多',link:'/invite/detail'}">
    <div slot="content" class="card-demo-flex card-demo-content01">
      <div class="vux-1px-l vux-1px-r">
        累计推广
        <br/>
        <span>{{NextLevelNum}}人</span>
      </div>
      <div class="vux-1px-r">
        累计获得分成<br/>
        <span>{{Rebate}}元</span>
      </div>
    </div>
    </card>

    </scroller>
  </div>
</template>

<script>
  import {XHeader, Qrcode, Divider, Card, Cell } from 'vux'
  export default {
    components: {
      XHeader,
      Qrcode,
      Divider,
      Card,
      Cell
    },
    name: 'users',
    data () {
      return {
        InviteCode: this.$store.state.userInfo.InviteCode,
        Rebate: this.$store.state.userInfo.Rebate,
        NextLevelNum: this.$store.state.userInfo.NextLevelNum
      }
    },
    computed: {
      shareLink () {
          return 'http://106.14.16.135/regist.html?InvitsCode=' +  this.InviteCode;
      }
    },
    methods: {
      toShareLink () {
         window.location.href = this.shareLink;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  .card-padding {  padding: 15px;  text-align: center;}
  .card-demo-flex {
    display: flex;
  }
  .card-demo-content01 {
    padding: 10px 0;
  }
  .card-padding {
    padding: 15px;
    text-align: center;
  }
  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .card-demo-flex span {
    color: #f74c31;
  }
</style>
