import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [

    { path: '/', component: () => import('pages/IndexPage.vue') },
    { path: '/login', component: () => import('pages/Auth/Login.vue') },
    { path: '/sign-up', component: () => import('pages/Auth/Signup.vue') },
    { path: '/profile/create', component: () => import('pages/Profile/CreateProfile.vue'),meta: { requiredAuth: true }, },
    { path: '/profile', component: () => import('pages/Profile/CreateProfile.vue'),meta: { requiredAuth: true }, },
    { path: '/dashboard/posts', component: () => import('pages/Dashboard/Posts.vue'),meta: { requiredAuth: true }, },
    { path: '/dashboard/create-posts', component: () => import('pages/Profile/CreateProfile.vue'),meta: { requiredAuth: true }, },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
