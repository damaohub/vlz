<template>
  <div>
    <x-header slot="header"
              title="任务记录"
              :left-options="{showBack: false}">

    </x-header>
    <scroller :on-infinite="infinite" :on-refresh="refresh" style="padding-top: 44px;">

      <group >
        <cell v-for="(item, key) in list" :key="key" :title="item.Type==4?'完成任务分成':'推广分成'" :inline-desc="item.CreateTime">
          <div slot="value">
            <span class="red">+{{item.Integral}}</span>
          </div>
        </cell>
      </group>
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
    name: 'record',
    data () {
      return {
        list: [],
        page: 0,
        pageEnd: false
      }
    },
    created: function () {
      this.getList()
    },
    methods: {
      getList () {
        axios.post('integral',{Token: this.$store.state.token,page: this.page},config)
          .then((res) => {
            if(res.data.rescode === 0){
                if(res.data.resdata.Integral.length != 0){
                  if(this.page === 0) {
                    this.list = [];
                    this.pageEnd = false;
                  }
                    this.list.push.apply(this.list, res.data.resdata.Integral);

                }else {
                   this.pageEnd = true;
                   console.log('recrd'+ this.pageEnd);
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

          setTimeout(() => {
            if(this.pageEnd == false){
              this.page+=1;
//              console.log('record请求第'+this.page+'页')
              this.getList();
              //  this.pageEnd = true;
              setTimeout(() => {
                done();
              })
            }
          },1500)


      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vux-flexbox-item{width: 25%;}
</style>
