<template>
  <div>
    <a @click="$router.go(-1)"  class="btn btn-link fix-left-top">返回</a>
    <table class="table">
      <thead>
          <tr>
            <th>手机号</th>
            <th>累计收益</th>
            <th>注册时间</th>
          </tr>
      </thead>
      <tr  v-for="list in lists">
        <td class="l1">{{list.Phone}}</td>
        <td class="l2">{{list.Integral}}</td>
        <td class="l3">{{list.RegistTime}}</td>
      </tr>

    </table>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'detail',
    data () {
      return {
        lists: [],
        page: 0,
        scrollTop: 0,
        clientHeight: 0,
        scrollHeight: 0

      }
    },
    created: function () {
      this.getLists();
      this.getScrollTop();
      this.getClientHeight();
      this.getScrollHeight();
      this.loadMore();
    },
    methods: {
      getLists: function () {
        var _this = this;
        var token = window.localStorage.getItem('Token');
        var phone = window.localStorage.getItem('Phone');
        if (token && phone) {
          axios.post('hostPlace/api/offline', {
            Token: token,
            page: _this.page
          })
            .then(function (response) {
              if(response.data.rescode==0){
                _this.lists.push.apply(_this.lists,response.data.resdata.offline);
              }else {

              }
            })
            .catch(function (error) {
              console.log(error);
              alert(response.data.resmsg);
              _this.$router.push({path: 'login'});
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
            _this.getLists();
          }
        }
      }
    }

  }
</script>

<style lang="css">

  .table  {
    line-height: 40px;
    position: relative;
    width: 100%;
    border-collapse: collapse;
    background: rgb(255, 255, 255);
    font-size: 1rem;
  }
  .table td.l3{font-size: 0.8rem;}
  .table:after{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #C7C7C7;
    color: #C7C7C7;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .table td,.table th{
  position: relative;
  border-right: 0;
  border-bottom: 0;
  }

  .table th {font-weight: 500;}
  .table td:before,.table th:before{    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #C7C7C7;
    color: #C7C7C7;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);}



</style>
