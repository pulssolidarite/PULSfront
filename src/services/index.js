import Vue from "vue";

import NotificationService from "./modules/notificationService";

function setServices() {
  Vue.prototype.$notifications = new NotificationService();
}

export default setServices;