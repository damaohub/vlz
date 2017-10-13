<template>
  <div>

  <slot v-show="!withChecker"></slot>
  <div class="vux-check-icon" v-show="withChecker" @click="updateValue">
    <icon type="success" v-show="type === 'default' && value"></icon>
    <icon type="success_circle" v-show="type === 'plain' && value"></icon>
    <icon type="circle" v-show="!value"></icon>
    <span><slot></slot></span>
  </div>
  </div>
</template>

<script>
  import Icon from '/node_modules/vux/src/components/icon'
  export default {
    name: 'with-checker',
    components: {
      'icon': Icon
    },
    methods: {
      updateValue () {
        this.$emit('update:value', !this.value)
      }
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'default'
      },
      withChecker: {
        type: Boolean,
        default: 'false'
      }
    }
  }
</script>

<style lang="less">
  @import '/node_modules/vux/src/styles/variable.less';
  .vux-check-icon {
    display: inline-block;
  }
  .vux-check-icon > span {
    line-height: 23px;
    color: #222;
    vertical-align: middle;
  }
  .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before {

  }
</style>
