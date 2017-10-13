<template>
<div class="with-footer">
    <ul id="load" class="list">
        <li v-for="list in lists" class="list-item">
            <div class="list-item-inner">
                <div class="list-item-text">
                    <div class="list-item-title">{{list.Type==4?'完成任务分成':'推广分成'}}</div>
                       {{list.CreateTime}}
                </div>
                <div class="list-item-right">+{{list.Integral}}</div>
            </div>
        </li>
    </ul>
    <foot></foot>
    </div>
</template>
<script>
import footer from '@/components/Footer'
import axios from 'axios'
    export default {
      name: 'tasklist',
      components: {'foot': footer},
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
            axios.post('hostPlace/api/integral', {
              page: _this.page,
              Token: token
            })
              .then(function (response) {
                  if(response.data.rescode==0){
                    _this.lists.push.apply(_this.lists,response.data.resdata.Integral);
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
                color: #757575;
                margin-left: 0.25rem;
                color: #e51c23;
        }
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
    .list .list-item-title{
    position: relative;
    max-width: 100%;
    color: #212121;
    font-size: 1rem;
    align-self: flex-start;
    padding: 5px 0;
    }
</style>
