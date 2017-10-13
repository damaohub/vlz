<template>
  <div>
    <x-header slot="header"
              title="推广邀请"
              >

    </x-header>

    <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
      <thead>
      <tr style="background-color: #F7F7F7">
        <th>下级手机号</th>
        <th>累计收益(元)</th>
        <th>注册时间</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in list" :key="index">
        <td>{{item.Phone}}</td>
        <td class="red">{{item.Integral/10000}}</td>
        <td class="timer">{{item.RegistTime}}</td>
      </tr>
      </tbody>
    </x-table>
    <span style="text-align: center;" v-if="noData">暂无数据</span>
  </div>
</template>

<script>
  import {XHeader,XTable } from 'vux'
  import config from '../axios-config'
  import axios from 'axios'
  export default {
    components: {
      XHeader,
      XTable
    },
    data () {
      return {
        page: 0,
        list: [],
        noData: false
      }
    },
    created: function () {
      this.getList()
    },
    methods: {
        getList () {
          axios.post('offline',{Token: this.$store.state.token,page: this.page},config)
            .then((res) => {
              if(res.data.rescode === 0){
                  if(this.page == 0 && res.data.resdata.offline.length == 0){
                      this.noData = true; return;
                  }
                this.list.push.apply(this.list, res.data.resdata.offline);
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
        }
    }

  }
</script>

<style>
  .timer{font-size: 12px;}
</style>
