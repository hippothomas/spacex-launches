<template>
  <div class="favorites">
    <h1>Mes Favoris</h1>
    <List :launches="launches"/>
  </div>
</template>

<script>
// @ is an alias to /src
import List from '@/components/List.vue';
import store from '@/store/FavoritesStore';

export default {
  name: 'Favoris',
  store: {
    store,
  },
  data() {
    return {
      launches: [],
    };
  },
  components: {
    List,
  },
  created() {
    // On récupère tout les lancements en favoris
    const launchesStore = store.getters.launches;

    // On boucle sur chaque lancement pour récuperer les informations à afficher
    launchesStore.forEach((launch) => {
      this.$axios.get(`https://api.spacexdata.com/v4/launches/${launch.id}`)
        .then((response) => {
          this.launches.push(response.data);
        });
    });
  },
};
</script>
