import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";

// General
import Home from "@/views/Home";
import UsageReports from "@/views/usageReports/Show";
import CustomerSpace from "@/views/customerSpace/Show";

// Terminals
import AllTerminals from "@/views/terminals/All";
import ShowTerminal from "@/views/terminals/Show";
import AddTerminal from "@/views/terminals/Add";
import EditTerminal from "@/views/terminals/Edit";

// Campains
import AllCampaigns from "@/views/campaigns/All";
import ShowCampaign from "@/views/campaigns/Show";
import AddCampaign from "@/views/campaigns/Add";
import EditCampaign from "@/views/campaigns/Edit";

// Games
import AllGames from "@/views/games/All";
import AddGame from "@/views/games/Add";
import EditGame from "@/views/games/Edit";
import ShowGame from "@/views/games/Show";

// Cores
import AllCores from "@/views/Admin/Cores/All";
import AddCore from "@/views/Admin/Cores/Add";
import EditCore from "@/views/Admin/Cores/Edit";

// Customers
import AllClients from "@/views/Admin/Clients/All";
import AddClient from "@/views/Admin/Clients/Add";
import EditClient from "@/views/Admin/Clients/Edit";

// ScreenSaver medias
import AllScreenSaverMedia from "@/views/screenSaverMedias/All";
import EditScreenSaverMedia from "@/views/screenSaverMedias/Edit";
import AddScreenSaverMedia from "@/views/screenSaverMedias/Add";

// ScreenSaver broadcasts
import AllScreenSaverBroadcast from "@/views/screenSaverBroadcasts/All";
import AddScreenSaverBroadcast from "@/views/screenSaverBroadcasts/Add";



Vue.use(VueRouter);

const routes = [

  // Home (dashboard) (Same component for Admin and Customers)

  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },

  // Terminals

  {
    path: "/terminals",
    name: "terminals",
    component: AllTerminals,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/terminals/:id",
    name: "terminal",
    component: ShowTerminal,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/terminal/add",
    name: "addTerminal",
    component: AddTerminal,
    meta: {
      requiresAuth: true,
      requiresAdmin: true, // Only for admin
    },
  },

  // Campains

  {
    path: "/terminal/:id/edit",
    name: "editTerminal",
    component: EditTerminal,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/campaigns",
    name: "campaigns",
    component: AllCampaigns,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/campaigns/:id",
    name: "campaign",
    component: ShowCampaign,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/campaign/add",
    name: "addCampaign",
    component: AddCampaign,
    meta: {
      requiresAuth: true,
      requiresAdmin: true, // Only for admin
    },
  },
  {
    path: "/campaign/:id/edit",
    name: "editCampaign",
    component: EditCampaign,
    meta: {
      requiresAuth: true,
      requiresAdmin: true, // Only for admin
    },
  },

  // Cores (only for admins)

  {
    path: "/cores",
    name: "cores",
    component: AllCores,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/core/add",
    name: "addCore",
    component: AddCore,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/core/:id/edit",
    name: "editCore",
    component: EditCore,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },

  // Games 

  {
    path: "/games",
    name: "games",
    component: AllGames,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/game/add",
    name: "addGame",
    component: AddGame,
    meta: {
      requiresAuth: true,
      requiresAdmin: true, // Only for admin
    },
  },
  {
    path: "/game/:id",
    name: "showGame",
    component: ShowGame,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/game/:id/edit",
    name: "editGame",
    component: EditGame,
    meta: {
      requiresAuth: true,
      requiresAdmin: true, // Only for admin
    },
  },

  // Customers (only for admin)

  {
    path: "/clients",
    name: "clients",
    component: AllClients,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/client/add",
    name: "addClient",
    component: AddClient,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/client/:id/edit",
    name: "editClient",
    component: EditClient,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },

  // Usage report

  {
    path: "/UsageReport",
    name: "UsageReport",
    component: UsageReports,
    meta: {
      requiresAuth: true,
    },
  },

  // Customer space

  {
    path: "/mon-espace",
    name: "customer-space",
    component: CustomerSpace,
    meta: {
      requiresAuth: true,
    },
  },

  // Screensaver medias

  {
    path: "/screensaver/medias",
    name: "screensaverMedias",
    component: AllScreenSaverMedia,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/screensaver/medias/add",
    name: "addScreensaverMedia",
    component: AddScreenSaverMedia,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/screensaver/medias/:id/edit",
    name: "editScreensaverMedia",
    component: EditScreenSaverMedia,
    meta: {
      requiresAuth: true,
    },
  },

  // Screensaver broadcasts

  {
    path: "/screensaver/broadcasts",
    name: "screensaverBroadcasts",
    component: AllScreenSaverBroadcast,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/screensaver/broadcasts/add",
    name: "addScreensaverBroadcast",
    component: AddScreenSaverBroadcast,
    meta: {
      requiresAuth: true,
    },
  },  
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,

  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.onlyFrom)) {
    if (from.name == to.meta.onlyFrom) {
      next();
      return;
    }
    next("/start");
  } else if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (store.getters.isAdmin) {
      next();
      return;
    }
    next("/");
  } else if (to.matched.some((record) => record.meta.requiresCustomer)) {
    if (store.getters.isCustomer) {
      next();
      return;
    }
    next("/");
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else if (to.matched.some((record) => record.meta.requiresAnon)) {
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
