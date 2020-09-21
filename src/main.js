import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import interceptors from "./axios/index.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Toasted from "vue-toasted";
import VueProgressBar from "vue-progressbar";
import VueYoutube from "vue-youtube";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import ToggleButton from "vue-js-toggle-button";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
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
  faLock,
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
  height: "3px",
});

Vue.config.productionTip = false;

// Axios stuff
const baseURL = process.env.VUE_APP_SERVER_URL;
axios.defaults.baseURL = baseURL;
Vue.prototype.$http = axios;
const token = localStorage.getItem("accessToken");
if (token) {
  Vue.prototype.$http.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
}
// We create the interceptors for AXIOS 401 responses
interceptors.createAxiosResponseInterceptor();

Vue.use(Toasted, {
  position: "bottom-center",
  duration: 6000,
  keepOnHover: true,
  iconPack: "fontawesome",
});

Vue.use(Toasted, {
  position: "bottom-right",
  duration: 6000,
  keepOnHover: true,
  iconPack: "fontawesome",
});

Vue.toasted.register(
  "error",
  (payload) => {
    // if there is no message passed show default message
    if (!payload.message) {
      return "Oops.. Something Went Wrong..";
    }
    // if there is a message show it with the message
    return payload.message;
  },
  {
    type: "error",
  }
);

Vue.toasted.register(
  "success",
  (payload) => {
    // if there is no message passed show default message
    if (!payload.message) {
      return "OK.";
    }
    // if there is a message show it with the message
    return payload.message;
  },
  {
    type: "success",
  }
);

// Progress bar for router
Vue.use(VueProgressBar, {
  color: "#17b978",
  failedColor: "#874b4b",
  thickness: "2px",
});

// Vue Loading Overlay
Vue.use(
  Loading,
  {
    // props
    color: "#5969ff",
    backgroundColor: "#fff",
    opacity: 0.4,
  },
  {
    // slots
  }
);

// Vue Select
Vue.component("v-select", vSelect);

// Vue Toggle Button
Vue.use(ToggleButton);

new Vue({
  mode: "history",
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
