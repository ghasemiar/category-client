import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [

    { path: '/', component: () => import('pages/IndexPage.vue') },
    { path: '/login', component: () => import('pages/Auth/Login.vue') },
    { path: '/profile/create', component: () => import('pages/Profile/CreateProfile.vue'),meta: { requiredAuth: true }, },
    { path: '/profile', component: () => import('pages/Profile/CreateProfile.vue'),meta: { requiredAuth: true }, },
    { path: '/profile/posts', component: () => import('pages/Profile/CreateProfile.vue'),meta: { requiredAuth: true }, },
    { path: '/profile/create-posts', component: () => import('pages/Profile/CreateProfile.vue'),meta: { requiredAuth: true }, },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
