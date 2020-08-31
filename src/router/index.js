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
    path: '/favorites',
    name: 'Favoris',
    component: () => import('../views/Favorites.vue'),
  },
  {
    path: '/launch/404',
    name: 'LaunchNotFound',
    component: () => import('../views/LaunchNotFound.vue'),
  },
  {
    path: '/launch/:launch',
    name: 'Launch',
    props: true,
    component: () => import('../views/Launch.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
