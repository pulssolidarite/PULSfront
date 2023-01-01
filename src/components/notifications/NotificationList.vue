<template>
  <div>
    <NotificationMessage
      v-for="(notification, index) in notifications"
      :key="notification.id"
      :notification="notification"
      :index="index" />
  </div>
</template>
  
<script>
  
import NotificationMessage from "./NotificationMessage";
  
export default {
  name: "NotificationList",
  components: {
    NotificationMessage,
  },
  computed: {
    notifications() {
      return this.$store.getters.getNotifications;
    },
  },
};
  
</script>
  
  <style scoped lang="scss">
  
  </style>