const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/dash",
        component: () => import("pages/DashPage.vue"),
      },
      {
        path: "/onama",
        component: () => import("pages/AboutPage.vue"),
      },
      {
        path: "/prijava",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "/trans",
        component: () => import("pages/TransPage.vue"),
      },
      {
        path: "/kontakt",
        component: () => import("pages/ContactPage.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
