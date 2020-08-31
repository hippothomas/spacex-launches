<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Lancements de SpaceX</h1>
    <List :launches="launches"/>
  </div>
</template>

<script>
// @ is an alias to /src
import List from '@/components/List.vue';

export default {
  name: 'Accueil',
  data: function data() {
    return {
      launches: {},
    };
  },
  components: {
    List,
  },
  mounted() {
    this.$axios.get('https://api.spacexdata.com/v4/launches')
      .then((response) => {
        this.launches = response.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>
