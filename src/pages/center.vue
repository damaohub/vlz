<template>
  <div>
    <x-header slot="header"
              title="个人中心"
              :left-options="{showBack: false}">
    </x-header>
    <scroller :on-refresh="refresh" style="padding-top: 44px;">
    <blur :blur-amount=6 :url="url" :height=150>
    </blur>

      <div class="user-header"> <img :src="url" alt=""><p>{{Phone}}</p></div>


    <card>
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-l vux-1px-r">
          总余额(元)
          <br/>
          <span>{{TotalIntegral}}</span>
          <inline-loading v-if="isUpdating"></inline-loading>
        </div>
        <div class="vux-1px-r">
          提现额度(元)
          <br/>
          <span>{{AllowPurse}}</span>
          <inline-loading v-if="isUpdating"></inline-loading>
        </div>
      </div>
    </card>
    <group>
      <cell title="账单明细" link="/center/bill" is-link><span class="iconfont" style="color: #ff8f00;" slot="icon">&#xe600;</span></cell>
      <cell title="我要提现" link="/center/withdraw" is-link><span class="iconfont" slot="icon" style="color: #ffbe00;">&#xe615;</span></cell>
    </group>
    <group>
      <cell title="联系客服" value="QQ:97107977" is-link><span class="iconfont" slot="icon" style="color: #0ec3ff">&#xe690;</span></cell>
    </group>
    <group>
      <cell title="退出登录" @click.native="logout()" is-link><span class="iconfont" slot="icon" style="color: #3996f2">&#xe62a;</span></cell>
    </group>
    </scroller>
  </div>
</template>

<script>
  import { XHeader, Blur, Group, Cell, Card, InlineLoading } from 'vux'
  import config from '../axios-config'
  import axios from 'axios'
  export default {
    components: {
      XHeader,
      Blur,
      Group,
      Cell,
      Card,
      InlineLoading,

    },
    data () {
      return {
        url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
        TotalIntegral: this.$store.state.userInfo.TotalIntegral,
        AllowPurse: this.$store.state.userInfo.AllowPurse,
        Phone: this.$store.state.userInfo.Phone,
        isUpdating: false
      }
    },
    methods: {

      logout () {
        this.$store.commit('isLogin',null);
        localStorage.removeItem('token');
        //this.$store.commit('userInfo',null);
        localStorage.removeItem('userInfo');
        this.$router.push('/login');
      },

      getUserInfo () {
        this.isUpdating = true;
        axios.post('user-info',{Token: this.$store.state.token},config)
          .then((res) => {
            if(res.data.rescode === 0){
              //this.userInfo = res.data.resdata;
              this.$store.commit('saveUserInfo',this.userInfo||res.data.resdata);
            }else {
              this.$vux.toast.show({
                text: res.data.resmsg,
                type: 'warn'
              })
              //this.$router.push({path: 'login'});
            }
            this.isUpdating = false;
          })
          .catch((err) => {
            console.log(err);
          })
      },

      refresh (done) {
        setTimeout(() => {
          this.getUserInfo();
          done();
        })
      },

    }
  }
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  .user-tel{color: #fff;font-size: 18px;padding-left: 15px;padding-top: 20px;}
  .user-header {
    position: relative;
    text-align: center;
    top: -50px;
    margin-bottom: -50px;
  }
  .user-header img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid #ececec;
  }

  .card-padding {  padding: 15px;  text-align: center;}

  .card-demo-content01 {
    padding: 10px 0;
  }
  .card-padding {
    padding: 15px;
  }
  .center{ margin:15px auto 0;text-align: center;color:rgba(255, 255, 255, 0.28);font-size:18px;}
  .icon-update{color: inherit;font-size: inherit;}

  @keyframes ani
 {
    0%   {transform: scale(1);color:rgba(255, 255, 255, 0.28);}
    25%  { transform: scale(1.5);color:rgba(255, 255, 255, 0.6);}
    50%  { transform: scale(1.5);color:rgba(255, 255, 255, 0.6);}
    100% {transform: scale(1);color:rgba(255, 255, 255, 0.18);}
  }

</style>
