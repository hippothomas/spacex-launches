import Vue from 'vue';
import VueRouter from 'vue-router';
import Accueil from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil,
  },
  {
    path: '/page/:numero',
    name: 'Accueil - Pagination',
    component: Accueil,
  },
  {
    path: '/favorites',
    name: 'Favoris',
    component: () => import('../views/Favorites.vue'),
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
  {
    path: '/launch/:launch',
    name: 'Launch',
    component: () => import('../views/Launch.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
