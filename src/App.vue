<template>
  <div id="app" class="flex-wrap flex-vertical">
    <header class="mint-header is-fixed">
    <div class="mint-header-button is-left"></div>
    <h1 class="mint-header-title">{{$route.name}}</h1>
    <div class="mint-header-button is-right"></div>
  </header>
    <div id="main" class="flex-con">
    <div class="holder" style="height:40px;"></div>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app'

}
</script>

<style>
@import './assets/reset.css';
html, body{height:100%;}
#app {
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.with-footer{margin-bottom:55px;}
footer{bottom:0;}
.flex-wrap {
    display: flex;
}
.flex-con{
    flex: 1;
}
.flex-vertical{
  flex-flow: column;
}


 .mint-header {
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    background-color: #f2f2f2;
    box-sizing: border-box;
    color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 18px;
    height: 40px;
    line-height: 1;
    padding: 0 10px;
    position: relative;
    text-align: center;
    white-space: nowrap;
}
.mint-header .mint-button {
    background-color: transparent;
    border: 0;
    box-shadow: none;
    color: inherit;
    display: inline-block;
    padding: 0;
    font-size: inherit
}
.mint-header .mint-button::after {
    content: none;
}
.mint-header.is-fixed {
    top: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 1;
}
.mint-header-button {
    -webkit-box-flex: .5;
        -ms-flex: .5;
            flex: .5;
}
.mint-header-button > a {
    color: inherit;
}
.mint-header-button.is-right {
    text-align: right;
}
.mint-header-button.is-left {
    text-align: left;
}
.mint-header-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: inherit;
    color: #323237;
    font-weight: 400;
            flex: 1;
}


.btn,button{
  font-size: 16px;
    font-weight: 400;
    line-height: 1.42;
    position: relative;
    display: inline-block;
    margin-bottom: 0;
    padding: 6px 12px;
    cursor: pointer;
    -webkit-transition: all;
    transition: all;
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
    text-align: center;
    vertical-align: top;
    white-space: nowrap;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 3px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    background-color: #fff;
    background-clip: padding-box;
  height:45px;
}
.btn{
  margin-top: 7px;
    margin-left: 0px;
}
.cell{
    background-color:#fff;
    box-sizing:border-box;
    color:inherit;
    min-height:48px;
    display:block;
    overflow:hidden;
    position:relative;
    text-decoration:none;
}
 .field{ border-top: 1px solid #dddddd;}
.cell-wrapper{
        background-image: linear-gradient(180deg,#d9d9d9,#d9d9d9 50%,transparent 0);
        background-size: 120% 1px;
        background-repeat: no-repeat;
        background-position: 0 0;
        background-origin: content-box;
        align-items: center;
        box-sizing: border-box;
        display: flex;
        font-size: 16px;
        line-height: 1;
        min-height: 3rem;
        overflow: hidden;
        padding: 0 10px;
        width: 100%;
        border-bottom: 1px solid #dddddd;
    }
   .cell-wrapper.noborder{
      border-bottom: 0;
  }
 .cell-text{
        vertical-align: middle;
    }
 .cell-value{
        display: flex;
        align-items: center;
        flex: 1;
        color: inherit;
    }
.cell-title{flex:1;}
.field .cell-title{
        flex:none;

    }
.cell img{ vertical-align: middle;width:24px;height:24px;}
.cell-allow-right:after{
    border: 2px solid #c8c8cd;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    top: 50%;
    right: 20px;
    position: absolute;
    width: 10px;
    height: 10px;
    -webkit-transform: translateY(-50%) rotate(45deg);
    transform: translateY(-50%) rotate(45deg);
}
.btn-link{
  padding-top: 6px;
  padding-bottom: 6px;
  color: #007aff;
  border: 0;
  background-color: transparent;
  height: auto;

}
.fix-right-top{
  position:fixed;
  top:0;
  right:0;
  z-index: 10;

}
.fix-left-top{
  position:fixed;
  top:0;
  left:0;
  z-index: 10;

}

.field-core{appearance:none;
     border-radius: 0;
    border: 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    outline: 0;
    line-height: 1.6;
    font-size: inherit;
    width: 100%;}
    .cell-left,.cell-right{
        flex:1;
    }
     .cell-left{
         text-align:left;
     }

     .cell-right{
         text-align:right;
     }
    .btn-inline{
        width:100%;
    }
.btn-default{
     background-color: #ccc;
      color: #fff;
}
.btn-primary{
    background-color:#26a2ff;
    color: #fff;
}
  .bg-grey{
    background: #eee;
  }

</style>
