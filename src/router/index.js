import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";

import Home from "../views/Admin/Home.vue";
import AllTerminals from "../views/Admin/Terminals/All.vue";
import ShowTerminal from "../views/Admin/Terminals/Show.vue";
import AddTerminal from "../views/Admin/Terminals/Add.vue";
import EditTerminal from "../views/Admin/Terminals/Edit.vue";
import AllCampaigns from "../views/Admin/Campaigns/All.vue";
import ShowCampaign from "../views/Admin/Campaigns/Show.vue";
import AddCampaign from "../views/Admin/Campaigns/Add.vue";
import EditCampaign from "../views/Admin/Campaigns/Edit.vue";
import AllGames from "../views/Admin/Games/All.vue";
import AddGame from "../views/Admin/Games/Add.vue";
import EditGame from "../views/Admin/Games/Edit.vue";
import AllClients from "../views/Admin/Clients/All.vue";
import AddClient from "../views/Admin/Clients/Add.vue";
import EditClient from "../views/Admin/Clients/Edit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/terminals",
    name: "terminals",
    component: AllTerminals,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/terminals/:id",
    name: "terminal",
    component: ShowTerminal,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/terminal/add",
    name: "addTerminal",
    component: AddTerminal,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/terminal/:id/edit",
    name: "editTerminal",
    component: EditTerminal,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/campaigns",
    name: "campaigns",
    component: AllCampaigns,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/campaigns/:id",
    name: "campaign",
    component: ShowCampaign,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/campaign/add",
    name: "addCampaign",
    component: AddCampaign,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/campaign/:id/edit",
    name: "editCampaign",
    component: EditCampaign,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/games",
    name: "games",
    component: AllGames,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/game/add",
    name: "addGame",
    component: AddGame,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/game/:id/edit",
    name: "editGame",
    component: EditGame,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/clients",
    name: "clients",
    component: AllClients,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/client/add",
    name: "addClient",
    component: AddClient,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/client/:id/edit",
    name: "editClient",
    component: EditClient,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.onlyFrom)) {
    if (from.name == to.meta.onlyFrom) {
      next();
      return;
    }
    next("/start");
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (store.getters.isAdmin) {
      next();
      return;
    }
    next("/");
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else if (to.matched.some(record => record.meta.requiresAnon)) {
    if (!store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

export default router;
