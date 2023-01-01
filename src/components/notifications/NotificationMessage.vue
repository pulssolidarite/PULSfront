<template>
  <div
    :class="{'visible': visible, 'hidden': !visible, 'success': notification.status == 'success', 'error': notification.status == 'error'}"
    :style="{'--index': index, '--transition-duration': transitionDuration/1000 + 's'}"
    class="notification-message">
    {{ notification.message }}
    <small v-if="notification.submessage"><br>{{ notification.submessage }}</small>
  </div>
</template>

<script>

export default {
  name:"NotificationMessage",
  props: {
    notification: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      visible: true,
      transitionDuration: 300, // Duration of the transition on appear and disapear in ms
    };
  },
  mounted() {
    setTimeout(
      () => {
        this.visible = false;
        setTimeout(
          () => {
            this.$store.dispatch("removeNotification", this.notification);
          }, this.transitionDuration,
        );
      }, this.notification.dismissAfter,
    );
  },
};

</script>

<style scoped lang="scss">

  .notification-message {
    position: fixed;
    bottom: calc(20px + var(--index) * 80px);
    border-radius: 9px;
    font-weight: 700;
    font-size: 1.5rem;
    padding: 1rem;
    z-index: 10000;
    transition: bottom var(--transition-duration) ease-in-out;

    &.visible {
      right: 20px;
      animation-name: fade;
      animation-duration: var(--transition-duration);
      animation-timing-function: ease-out;
      -o-animation-timing-function: ease-out;
      -moz-animation-timing-function: ease-out;
      -webkit-animation-timing-function: ease-out;

      @-webkit-keyframes fade {
        0% {opacity: 0; right: -100px;}
        100% {opacity: 1; right: 20px;}
      } 

      @keyframes fade {
        0% {opacity: 0; right: -100px;}
        100% {opacity: 1; right: 20px;}
      }
    }

    &.hidden {
      right: -100px;
      animation-name: fade-out;
      animation-duration: var(--transition-duration);
      animation-timing-function: ease-in;
      -o-animation-timing-function: ease-in;
      -moz-animation-timing-function: ease-in;
      -webkit-animation-timing-function: ease-in;

      @-webkit-keyframes fade-out {
        0% {opacity: 1; right: 20px;}
        100% {opacity: 0; right: -100px;}
      } 

      @keyframes fade-out {
        0% {opacity: 1; right: 20px;}
        100% {opacity: 0; right: -100px;}
      }
    }
    
    &.success {
      background: #d4edda;
      color: #165825;
    }

    &.error {
      background: #f8d7da;
      color: #721c24;
    }
  }

</style>