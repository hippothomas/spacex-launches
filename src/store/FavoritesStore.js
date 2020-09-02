import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    launches: [],
  },
  mutations: {
    ADD_FAV: (state, id) => {
      state.launches.push({
        id,
      });
    },
    REMOVE_FAV: (state, id) => {
      state.launches.splice(id, 1);
    },
  },
  getters: {
    launches: (state) => state.launches,
    launch: (state) => ((id) => state.launches.find((launch) => launch.id === id)),
  },
  plugins: [vuexLocal.plugin],
});
