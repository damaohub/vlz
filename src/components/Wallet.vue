<template>
<div >
  <a @click="$router.go(-1)"  class="btn btn-link fix-left-top">返回</a>
    <ul id="load" class="list">
        <li v-for="wallet in walletInfo" class="list-item">
            <div class="list-item-inner">
                <div class="list-item-text">
                    <div class="list-item-title">申请提现（{{wallet.Integral}}元）</div>
                     <span class="timer">{{wallet.PurseTime}}</span>
                </div>
                <div v-if="wallet.Status==3" class="list-item-right ">提现成功</div>
                <div v-if="wallet.Status==2" class="list-item-right green">提现拒绝</div>
                <div v-if="wallet.Status==1" class="list-item-right green">正在审核</div>
            </div>
        </li>
    </ul>

    </div>
</template>
<script>

import { Loadmore } from 'mint-ui'
import axios from 'axios'
    export default {
      name: 'wallet',
      components: {'#load': Loadmore},
      data () {
          return {
            walletInfo: [],
            page: 0,
            status: ''
          }
      },
      created: function () {
        this.getWallet();
        this.getScrollTop();
        this.getClientHeight();
        this.getScrollHeight();
        this.loadMore();
      },
      methods: {
        getWallet: function () {
          var _this = this;
          var token = window.localStorage.getItem('Token');
          var phone = window.localStorage.getItem('Phone');
          if(token && phone) {
            axios.post('hostPlace/api/log-purse', {
              Token: token,
              page: _this.page
            })
              .then(function (response) {
                _this.walletInfo.push.apply(_this.walletInfo,response.data.resdata.LogPurse);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
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
            this.clientHeight  = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
          }
          return this.clientHeight;
        },
        //内容可是区域的高度加上高度的溢出（滚动）的距离
        getScrollHeight: function () {
          return this.scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        },
        loadMore: function () {
          var _this =this;
          window.onscroll =function () {
            var scrollTop = _this.getScrollTop();
            var clientHeight = _this.getClientHeight();
            var scrollHeight = _this.getScrollHeight();
            if(scrollTop + clientHeight==scrollHeight){
              _this.page+=1;
              _this.getWallet();
            }
          }
        }

      }
    }
</script>
<style lang="css">
    .list{
    position: relative;
    font-size: 0.8rem;
    background-color: #ffffff;
    border-top: 1px solid #dddddd;
    }
    .list .list-item{
    list-style: none;
    margin: 0;
    padding: 0;
    padding-left: 0.75rem;
    color: #212121;
    border-bottom: 1px solid #dddddd;
    position: relative;
    min-height: 2.2rem;
    -webkit-box-sizing: border-box;
    		box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    		justify-content: space-between;
    }

    .list .list-item-inner{
        position: relative;
    min-height: 2.2rem;
	padding-right: 0.75rem;
    width: 100%;
    -webkit-box-sizing: border-box;
    		box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
			justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
			align-items: center;
    }
    .list .list-item-right{
      max-width: 50%;
      position: relative;
      font-size: 1rem;
      margin-left: 0.25rem;
      color: #e51c23;
    }
    .list-item-right.green{color: green;}
    .list .list-item-text{
      color: #757575;
      position: relative;
      box-sizing: border-box;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      font-size: .9rem;
    }
    .list .list-item-text .timer{align-self: flex-start;}
    .list .list-item-title{
      position: relative;
      max-width: 100%;
      color: #212121;
      font-size: 1rem;
      align-self: flex-start;
      padding: 5px 0;
    }
</style>
