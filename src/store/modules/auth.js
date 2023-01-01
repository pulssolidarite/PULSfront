
//// State
// The state contains the vars to store
// State MUST be a function so the module can be instantiated multiple times
// To get a var value, call >store.state.me;<
const state = () => ({
  currentUser: JSON.parse(localStorage.getItem("userInfo")) || {},
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
});
    
//// Getters
// Call >store.getters.getMe;<
const getters = {
  isLoggedIn: (state) => {
    return state.refreshToken != "" && state.currentUser != null;
  },
  isAdmin: (state) => {
    return state.currentUser.is_staff;
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
  canCurrentUserEditScreensavers: (state) => {
    if (state.currentUser.is_staff) {
      return true;
    }
    const customer = state.currentUser.customer;
    if (customer) {
      return customer.can_edit_screensaver_broadcasts;
    }
    return false;
  },
};
    
//// Mutations
// Vars MUST be mutated through mutators
// Call >store.commit('setMe');<
// Mutators MUST be synchronous
const mutations = {
  SET_BEARER(state, accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  },
  SET_TOKENS(state, payload) {
    state.accessToken = payload.access;
    state.refreshToken = payload.refresh;
  },
  UPDATE_USER_INFO(state, payload) {
    state.currentUser = payload;
    localStorage.setItem("userInfo", JSON.stringify(payload));
  },
  DELETE_USER_INFO(state) {
    // Get Data localStorage
    state.currentUser = null;
    state.refreshToken = "";
    state.accessToken = "";
    localStorage.removeItem("userInfo");
  },
};
    
//// Actions
// Actions are functions that can be asynchronous
// They receive an argument context that exposes the state, getters and mutations.
// Call >store.dispatch('pushNotification', {}).then();<
const actions = {
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
  refreshCurrentUser({ commit }) {
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
};
    
    
export default {
  state,
  getters,
  mutations,
  actions,
};