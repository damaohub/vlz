<template>
    <footer class="mint-tabbar is-fixed">
      <router-link to="/users" class="mint-tab-item">

        <div class="mint-tab-item-icon">
           <span class="img"></span>
        </div>
        <div class="mint-tab-item-label">
           账号列表
        </div>

      </router-link>
      <router-link to="/invite" class="mint-tab-item">

        <div class="mint-tab-item-icon">
           <span class="img"></span>
        </div>
        <div class="mint-tab-item-label">
             推广邀请
        </div>
        </router-link>

      <router-link to="/tasklist" class="mint-tab-item">

        <div class="mint-tab-item-icon">
           <span class="img"></span>
        </div>
        <div class="mint-tab-item-label">
           任务记录
        </div>
        </router-link>

     <router-link to="/center" class="mint-tab-item">
        <div class="mint-tab-item-icon">
           <span class="img"></span>
        </div>
        <div class="mint-tab-item-label">
             个人中心
          </div>
      </router-link>

    </footer>
</template>
<script>
    export default {
        name: 'footer',
        data () {
            return {

            }
        }
    }
</script>
<style>
    .mint-tabbar {
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: top left;
    position: relative;
    background-color: #fafafa;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    right: 0;
    bottom: 0;
    left: 0;
    position: relative;
    text-align: center;
}
.mint-tabbar > .mint-tab-item.is-selected {
    color: #6ab494;
}
.mint-tabbar.is-fixed {
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1;
}

.mint-tab-item {
    display: block;
    padding: 7px 0;
            flex: 1;
    text-decoration: none;
    color: #323237;
}


.mint-tab-item-icon {
    width: 24px;
    height: 24px;
    margin: 0 auto 5px;
}

.mint-tab-item-icon .img{
    background:  no-repeat center;
    background-size: 100%;
}
.mint-tab-item:nth-child(1) .mint-tab-item-icon .img{
  background-image: url(../../static/img/bottombtn0101.png);
}
.mint-tab-item:nth-child(1).router-link-active .mint-tab-item-icon .img{
  background-image: url(../../static/img/bottombtn0102.png);
}
.mint-tab-item:nth-child(2) .mint-tab-item-icon .img{
  background-image: url(/static/img/bottombtn0201.png);
}
.mint-tab-item:nth-child(2).router-link-active .mint-tab-item-icon .img{
  background-image: url(/static/img/bottombtn0202.png);
}
.mint-tab-item:nth-child(3) .mint-tab-item-icon .img{
  background-image: url(../../static/img/bottombtn0301.png);
}
.mint-tab-item:nth-child(3).router-link-active .mint-tab-item-icon .img{
  background-image: url(../../static/img/bottombtn0302.png);
}
.mint-tab-item:nth-child(4) .mint-tab-item-icon .img{
  background-image: url(../../static/img/bottombtn0401.png);
}
.mint-tab-item:nth-child(4).router-link-active .mint-tab-item-icon .img{
  background-image: url(../../static/img/bottombtn0402.png);
}


.mint-tab-item-icon:empty {
    display: none
}
.mint-tab-item-icon > * {
    display: block;
    width: 100%;
    height: 100%
}
.mint-tab-item-label {
    color: inherit;
    font-size: 12px;
    line-height: 1
}
</style>
