
//// State
// The state contains the vars to store
// State MUST be a function so the module can be instantiated multiple times
// To get a var value, call >store.state.me;<
const state = () => ({
  notifications: [],
});
  
//// Getters
// Call >store.getters.getMe;<
const getters = {
  getNotifications: state => {
    return state.notifications;
  },
};
  
//// Mutations
// Vars MUST be mutated through mutators
// Call >store.commit('setMe');<
// Mutators MUST be synchronous
const mutations = {
  addNofification(state, notification) {
    state.notifications.push(
      {
        "id": (Math.random().toString(36) + Date.now().toString(36)).substr(2),
        ...notification,
      },
    );
  },
  removeNotification(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      notification => {
        return notification.id != notificationToRemove.id;
      },
    );
  },
};
  
//// Actions
// Actions are functions that can be asynchronous
// They receive an argument context that exposes the state, getters and mutations.
// Call >store.dispatch('pushNotification', {}).then();<
const actions = {
  pushNotification(context, notification) {
    context.commit("addNofification", notification);
  },
  removeNotification(context, notification) {
    context.commit("removeNotification", notification);
  },
};
  
  
export default {
  state,
  getters,
  mutations,
  actions,
};