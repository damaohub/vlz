<template>
  <div>
    <x-header slot="header"
              title="明细"
             >

    </x-header>

    <scroller :on-infinite="infinite" :on-refresh="refresh" style="padding-top: 44px;">
      <span style="text-align: center;" v-if="noData">暂无数据</span>
      <group >

        <cell v-for="(item, key) in list" :key="key"  :inline-desc="item.PurseTime">
         <div slot="title">
           <span v-if="item.Status==1" style="color: blue;">正在审核...</span>
           <span v-if="item.Status==2" style="color: red;">提现拒绝</span>
           <span v-if="item.Status==3" style="color: #1AAD19;">提现成功</span>
         </div>
          <div slot="value">
            <span style="color: #000;">{{item.Integral}}</span>
          </div>
        </cell>
      </group
      >
    </scroller>

  </div>
</template>

<script>
  import {XHeader,Group, Cell} from 'vux'
  import config from '../axios-config'
  import axios from 'axios'
  export default {
    components: {
      XHeader,
      Group,
      Cell
    },
    data () {
      return {
        TotalIntegral: this.$store.state.userInfo.TotalIntegral,
        list: [],
        statusText: '',
        page: 0,
        pageEnd: false,
        noData: false
      }
    },
    created: function () {
      this.getList()
    },

    methods: {
      getList () {
        axios.post('log-purse',{Token: this.$store.state.token,page: this.page},config)
          .then((res) => {
            if(res.data.rescode === 0){
              if(res.data.resdata.LogPurse.length != 0){
                if(this.page === 0) {
                  this.list = [];
                  this.pageEnd =false;
                }
                this.list.push.apply(this.list, res.data.resdata.LogPurse);

              }else {
                this.pageEnd = true;
              }
            }else {
              this.$vux.toast.show({
                text: res.data.resmsg,
                type: 'warn'
              });
              this.$router.push({path: 'login'});
            }
          })
          .catch((err) => {
            console.log(err);
          })
      },
      refresh (done){
        setTimeout(() => {
          this.page =0;
          this.getList();
          done();
        })
      },
      infinite (done) {
        if(this.pageEnd == true) {
          setTimeout(() => {
            done(true);
          },1500)
        }
        if(this.pageEnd == false){
          setTimeout(() => {
              this.page+=1;
              this.getList();
              //  this.pageEnd = true;
              setTimeout(() => {
                done();
              })

          },1500)
        }


      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .vux-flexbox-item{width: 25%;}
</style>
