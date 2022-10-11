import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import jwt from "../axios/jwt";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    errors: "",
    currentUser: JSON.parse(localStorage.getItem("userInfo")) || {},
    accessToken: localStorage.getItem("accessToken") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
    maxGames: 3,
    maxCampaigns: 3,
  },
  mutations: {
    SET_BEARER(state, accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    },
    SET_TOKENS(state, payload) {
      state.accessToken = payload.access;
      state.refreshToken = payload.refresh;
    },
    UPDATE_USER_INFO(state, payload) {
      // Get Data localStorage
      let userInfo =
        JSON.parse(localStorage.getItem("userInfo")) || state.currentUser;
      for (const property of Object.keys(payload)) {
        if (payload[property] != null) {
          // If some of user property is null - user default property defined in state.currentUser
          state.currentUser[property] = payload[property];

          // Update key in localStorage
          userInfo[property] = payload[property];
        }
      }
      // Store data in localStorage
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    DELETE_USER_INFO(state) {
      // Get Data localStorage
      state.currentUser = {};
      state.refreshToken = "";
      state.accessToken = "";
      localStorage.removeItem("userInfo");
    },
  },
  actions: {
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        jwt
          .login(payload.username, payload.password)
          .then((response) => {
            // Set accessToken
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            commit("SET_TOKENS", response.data);

            // Set bearer token in axios
            commit("SET_BEARER", response.data.access);

            // Update user details
            jwt
              .getUserInfo()
              .then((resp) => {
                commit("UPDATE_USER_INFO", resp.data);
                // Navigate User to homepage
                router.push(router.currentRoute.query.to || "/");
                resolve(response);
              })
              .catch((err) => {
                console.warn(err);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                reject({
                  message:
                    "Impossible d'accéder à ce compte. Il a peut-être expiré ou a été désactivé.",
                });
              });
          })
          .catch((err) => {
            console.error(err.response);
            reject({
              message:
                "Impossible de se connecter avec ces identifiants. Veuillez réessayer."+err,
            });
          });
      });
    },
    refreshAccessToken({ commit }, payload) {
      localStorage.setItem("accessToken", payload.access);

      // Set bearer token in axios
      commit("SET_BEARER", payload.access);

      // Update user details
      jwt.getUserInfo().then((resp) => {
        commit("UPDATE_USER_INFO", resp.data);
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        commit("DELETE_USER_INFO");
        router.push("/login");
        resolve({ message: "Vous êtes désormais déconnecté." });
      });
    },
  },
  getters: {
    isLoggedIn: (state) => {
      return state.refreshToken != "";
    },
    isAdmin: (state) => {
      return state.currentUser.is_staff;
    },
    isSuperuser: (state) => {
      return state.currentUser.is_superuser;
    },
    isCustomer: (state) => {
      return !state.currentUser.is_staff; // TODO should have a better way to identify customer user, because the terminal user will also pass this check
    },
    username: (state) => {
      return state.currentUser.username;
    },
    currentUser: (state) => {
      return state.currentUser;
    },
  },
  modules: {},
});
