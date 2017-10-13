<template>

    <view-box body-padding-top="46px" body-padding-bottom="55px">
      <div v-transfer-dom>
        <loading v-model="isLoading"></loading>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>


      <tabbar v-show="showBar">
        <tabbar-item link="/" :selected="this.$route.path==='/'">
         <span class="tabbar-icon" slot="icon">&#xe632;</span>
          <span slot="label">账号列表</span>
        </tabbar-item>
        <tabbar-item link="/invite" :selected="this.$route.path==='/invite'">
          <span class="tabbar-icon" slot="icon">&#xe7fc;</span>
          <span slot="label">推广邀请</span>
        </tabbar-item>
        <tabbar-item link="/record" :selected="this.$route.path==='/record'">
          <span class="tabbar-icon" slot="icon">&#xe63b;</span>
          <span slot="label">任务记录</span>
        </tabbar-item>
        <tabbar-item link="/center" :selected="this.$route.path==='/center'">
          <span class="tabbar-icon" slot="icon">&#xe625;</span>
          <span slot="label">个人中心</span>
        </tabbar-item>

      </tabbar>


    </view-box>

</template>

<script>
  import{TransferDom,XHeader,ViewBox,Tabbar,TabbarItem,Loading } from 'vux';
  import { mapState, mapActions } from 'vuex';

  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      ViewBox,
      Tabbar,
      TabbarItem,
      Loading
    },
    name: 'app',

    computed: {
      ...mapState({
          isLoading: state => state.isLoading,

      }),
      showBar () {
          if(this.$route.path==='/'||this.$route.path==='/record'||this.$route.path==='/invite'||this.$route.path==='/center'){
              return true;
          }
          return false;
      }

    },
    created:function () {

    },
  }
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
html,body{height: 100%;width: 100%;overflow-x: hidden;}
body {
  background-color: #fbf9fe;
}
.vux-header{width:100%;position:absolute;left:0;top:0;z-index:100;}

.red{color: red;}
@font-face {
  font-family: 'iconfont';  /* project id 421583 */
  src: url('//at.alicdn.com/t/font_421583_6b0rtysvm61aif6r.eot');
  src: url('//at.alicdn.com/t/font_421583_6b0rtysvm61aif6r.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_421583_6b0rtysvm61aif6r.woff') format('woff'),
  url('//at.alicdn.com/t/font_421583_6b0rtysvm61aif6r.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_421583_6b0rtysvm61aif6r.svg#iconfont') format('svg');
}
.tabbar-icon{font-family:'iconfont' ;font-size:22px;}
.iconfont{font-family:'iconfont';padding-right: 10px;}
.card-demo-flex {display: flex;  }
.card-demo-flex > div {  flex: 1;  text-align: center;  font-size: 12px;  }
.card-demo-flex span {  color: #f74c31;}
</style>
