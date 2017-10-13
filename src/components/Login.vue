<template>
<div class="cell field" >
    <div class="cell-wrapper">
        <div class="cell-title">
            <span class="cell-text">手机号：</span>
        </div>
        <div class="cell-value">
            <input class="field-core"  v-model="form.Phone" type="tel" placeholder="请输入手机号" required="required">
        </div>
    </div>
    <div class="cell-wrapper">
        <div class="cell-title">
            <span class="cell-text">密  码：</span>
        </div>
        <div class="cell-value">
            <input class="field-core" v-model="form.Password" type="password" placeholder="请输入密码" required="required">
        </div>
    </div>
    <div class="cell-wrapper  no-border"  style="padding-top: 30px;">
        <div class="cell-left">
            <a href="#/register"><small>注册账号</small></a>
        </div>
        <div class="cell-right">
            <a href="#/pawdfg"><small>忘记密码</small></a>
        </div>
    </div>
    <div class="cell-wrapper no-border">
        <button @click="login()" class="btn btn-inline btn-primary ">登录</button>
    </div>
</div>

</template>
<script>
import axios from 'axios'
    export default {
        name: 'login',
        data () {
            return {
                form: {
                    Phone: '',
                    Password: ''
                }

            }
        },
        methods: {
            login: function() {
                var _this = this;
                  axios.post('hostPlace/api/login', {
                        Phone: _this.form.Phone,
                        Password: _this.form.Password
                        })
                  .then(function (response) {
                       if(response.data.rescode==0){
                            if(window.localStorage){
                             window.localStorage.setItem('Phone',JSON.parse(response.config.data).Phone);
                             window.localStorage.setItem('Token',response.data.resdata.Token);
                              alert(response.data.resmsg);
                              _this.$router.push({ path: 'users' });
                            }
                       }else{
                         alert(response.data.resmsg);
                         _this.$router.push({ path: 'login' });

                       }


                  })
                  .catch(function (error) {
                        console.log(error);
                  });

            }
        }

    }
</script>

<style lang="">
  .no-border{border:none;padding:2px auto;}
</style>
