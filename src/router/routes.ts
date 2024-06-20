import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [

    { path: '/', component: () => import('pages/IndexPage.vue') },
    { path: '/login', component: () => import('pages/Auth/Login.vue') },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
