import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

// On persiste les données du store dans le localStorage
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    launches: [],
  },
  mutations: {
    // Ajoute à la liste des favoris
    ADD_FAV: (state, id) => {
      state.launches.push({
        id,
      });
    },
    // Supprime de la liste des favoris
    REMOVE_FAV: (state, id) => {
      state.launches.splice(id, 1);
    },
  },
  getters: {
    // Récupère tout les lancements en favoris
    launches: (state) => state.launches,
    // Permet de chercher un lancement par son id
    launch: (state) => ((id) => state.launches.find((launch) => launch.id === id)),
  },
  plugins: [vuexLocal.plugin],
});
