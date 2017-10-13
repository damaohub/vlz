<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
         <button class="btn-link modal-default-button" @click="$emit('close')">
                X
              </button>
          <div class="modal-header">
            <slot name="header">
              default header
            </slot>

          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>

 </template>

<script>
    export default {
        name: 'modal'
    }
</script>

<style lang="">
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
      position: relative;
        width: 60%;
      background: #fff;
      max-width: 325px;
        margin: 0px auto;
        padding: 0px 0px;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
      overflow: hidden;
    }

    .modal-default-button {
      float: right;
      position: absolute;
      bottom: -37px;
      font-size: 14px;
      border-radius: 50%;
      border: 1px solid #989494;
      left: 45%;
    }

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
         opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container{
        transform: scale(1.1);
    }
</style>
