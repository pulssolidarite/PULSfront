import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VueProgressBar from "vue-progressbar";
import VueYoutube from "vue-youtube";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faPen,
  faTimes,
  faPlus,
  faCheck,
  faLink,
  faEuroSign,
  faPlay,
  faVideo,
  faBell,
  faCog,
  faPowerOff,
  faRocket,
  faUser,
  faFile,
  faGamepad,
  faColumns,
  faWallet,
  faArrowUp,
  faArrowDown,
  faAngleRight,
  faEye,
  faTrashAlt,
  faEnvelope,
  faMapPin,
  faUndo,
  faLock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Alert from "@/components/Alert.vue";
require("./assets/admin/vendor/bootstrap/css/bootstrap.min.css");
require("./assets/admin/vendor/fonts/circular-std/style.css");
require("./assets/admin/libs/css/style.css");
require("./assets/admin/vendor/charts/chartist-bundle/chartist.css");
require("./assets/admin/vendor/charts/morris-bundle/morris.css");
require("./assets/admin/vendor/charts/c3charts/c3.css");
require("./assets/admin/vendor/fonts/flag-icon-css/flag-icon.min.css");

// Font Awesome Stuff
library.add(
  faUserSecret,
  faPen,
  faTimes,
  faPlus,
  faCheck,
  faLink,
  faEuroSign,
  faPlay,
  faVideo,
  faBell,
  faCog,
  faPowerOff,
  faRocket,
  faUser,
  faFile,
  faGamepad,
  faColumns,
  faWallet,
  faAngleRight,
  faArrowUp,
  faArrowDown,
  faEye,
  faTrashAlt,
  faEnvelope,
  faMapPin,
  faUndo,
  faLock
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// Adding error handling component
Vue.component("Alert", Alert);

Vue.use(VueYoutube);

// Loading bar stuff
Vue.use(VueProgressBar, {
  color: "rgb(91, 184, 93)",
  failedColor: "red",
  height: "3px"
});

Vue.config.productionTip = false;

// Axios stuff
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

// Add a request interceptor
Vue.prototype.$http.interceptors.request.use(
  function(config) {
    console.log("starting request");
    store.commit("loading", true);
    return config;
  },
  function(error) {
    // Do something with request error
    console.log("request error");
    store.commit("loading", false);
    return Promise.reject(error);
  }
);

// Add a response interceptor
Vue.prototype.$http.interceptors.response.use(
  response => {
    console.log("finished");
    store.commit("loading", false);
    return response;
  },
  error => {
    // Error handling part
    console.log("error in response");
    store.commit("loading", false);
    return error;
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
